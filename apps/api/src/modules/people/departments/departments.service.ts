import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { departments, employees } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateDepartmentBody, UpdateDepartmentBody } from './departments.schema.js';

export async function listDepartments(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const where = eq(departments.organizationId, orgId);
  const [rows, [c]] = await Promise.all([
    db.select().from(departments).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(departments).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function getDepartment(orgId: string, id: string) {
  const [row] = await db
    .select()
    .from(departments)
    .where(and(eq(departments.id, id), eq(departments.organizationId, orgId)))
    .limit(1);
  return row ?? null;
}

export async function getDepartmentEmployees(orgId: string, id: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const where = and(eq(employees.organizationId, orgId), eq(employees.departmentId, id));

  const [rows, [c]] = await Promise.all([
    db.select({
      id: employees.id,
      name: employees.name,
      email: employees.email,
      role: employees.role,
      status: employees.status,
    }).from(employees).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(employees).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function createDepartment(orgId: string, body: CreateDepartmentBody) {
  const [row] = await db.insert(departments).values({ ...body, organizationId: orgId }).returning();
  return row;
}

export async function updateDepartment(orgId: string, id: string, body: UpdateDepartmentBody) {
  const [row] = await db
    .update(departments)
    .set(body)
    .where(and(eq(departments.id, id), eq(departments.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function deleteDepartment(orgId: string, id: string) {
  const [row] = await db
    .delete(departments)
    .where(and(eq(departments.id, id), eq(departments.organizationId, orgId)))
    .returning();
  return row ?? null;
}
