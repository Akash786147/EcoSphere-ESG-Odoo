import { eq, and, count, like } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { employees } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import bcrypt from 'bcryptjs';
import type { Request } from 'express';
import type { CreateEmployeeBody, UpdateEmployeeBody, ChangeRoleBody, DiversityUpdateBody } from './employees.schema.js';

export async function listEmployees(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(employees.organizationId, orgId)];

  if (req.query['department']) conditions.push(eq(employees.departmentId, String(req.query['department'])));
  if (req.query['role']) conditions.push(eq(employees.role, String(req.query['role'])));
  if (req.query['status']) conditions.push(eq(employees.status, String(req.query['status'])));
  if (req.query['search']) conditions.push(like(employees.name, `%${req.query['search']}%`));

  const where = and(...conditions);

  const [rows, [c]] = await Promise.all([
    db
      .select({
        id: employees.id,
        name: employees.name,
        email: employees.email,
        departmentId: employees.departmentId,
        role: employees.role,
        status: employees.status,
        joinDate: employees.joinDate,
      })
      .from(employees)
      .where(where)
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(employees).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function getEmployee(orgId: string, id: string) {
  const [row] = await db
    .select({
      id: employees.id,
      name: employees.name,
      email: employees.email,
      departmentId: employees.departmentId,
      role: employees.role,
      status: employees.status,
      joinDate: employees.joinDate,
      gender: employees.gender,
      ageBand: employees.ageBand,
      ethnicity: employees.ethnicity,
      disabilityStatus: employees.disabilityStatus,
      nationality: employees.nationality,
    })
    .from(employees)
    .where(and(eq(employees.id, id), eq(employees.organizationId, orgId)))
    .limit(1);
  return row ?? null;
}

export async function createEmployee(orgId: string, body: CreateEmployeeBody) {
  const [existing] = await db.select().from(employees).where(eq(employees.email, body.email)).limit(1);
  if (existing) throw Object.assign(new Error('Email already registered'), { status: 409 });

  const passwordHash = await bcrypt.hash(body.password, 10);
  const { password: _p, ...rest } = body;

  const [row] = await db
    .insert(employees)
    .values({
      ...rest,
      organizationId: orgId,
      passwordHash,
      status: 'ACTIVE',
    })
    .returning({
      id: employees.id,
      name: employees.name,
      email: employees.email,
      role: employees.role,
    });
  return row;
}

export async function updateEmployee(orgId: string, id: string, body: UpdateEmployeeBody) {
  const [row] = await db
    .update(employees)
    .set(body)
    .where(and(eq(employees.id, id), eq(employees.organizationId, orgId)))
    .returning({
      id: employees.id,
      name: employees.name,
      role: employees.role,
    });
  return row ?? null;
}

export async function deleteEmployee(orgId: string, id: string) {
  const [row] = await db
    .update(employees)
    .set({ status: 'INACTIVE' })
    .where(and(eq(employees.id, id), eq(employees.organizationId, orgId)))
    .returning({ id: employees.id });
  return row ?? null;
}

export async function changeRole(orgId: string, id: string, body: ChangeRoleBody) {
  const [row] = await db
    .update(employees)
    .set({ role: body.role })
    .where(and(eq(employees.id, id), eq(employees.organizationId, orgId)))
    .returning({ id: employees.id, role: employees.role });
  return row ?? null;
}

export async function updateDiversity(orgId: string, id: string, body: DiversityUpdateBody) {
  const [row] = await db
    .update(employees)
    .set(body)
    .where(and(eq(employees.id, id), eq(employees.organizationId, orgId)))
    .returning({ id: employees.id });
  return row ?? null;
}

export async function getDiversityOverview(orgId: string) {
  const activeEmployees = await db
    .select({
      gender: employees.gender,
      ageBand: employees.ageBand,
      ethnicity: employees.ethnicity,
    })
    .from(employees)
    .where(and(eq(employees.organizationId, orgId), eq(employees.status, 'ACTIVE')));

  const summary = {
    total: activeEmployees.length,
    gender: {} as Record<string, number>,
    ageBand: {} as Record<string, number>,
    ethnicity: {} as Record<string, number>,
  };

  for (const emp of activeEmployees) {
    if (emp.gender) summary.gender[emp.gender] = (summary.gender[emp.gender] ?? 0) + 1;
    if (emp.ageBand) summary.ageBand[emp.ageBand] = (summary.ageBand[emp.ageBand] ?? 0) + 1;
    if (emp.ethnicity) summary.ethnicity[emp.ethnicity] = (summary.ethnicity[emp.ethnicity] ?? 0) + 1;
  }

  return summary;
}
