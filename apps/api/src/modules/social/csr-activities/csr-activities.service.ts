import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { csrActivities, employeeParticipations } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateCsrActivityBody, UpdateCsrActivityBody } from './csr-activities.schema.js';

export async function listCsrActivities(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(csrActivities.organizationId, orgId)];
  if (req.query['status']) conditions.push(eq(csrActivities.status, String(req.query['status'])));
  if (req.query['category']) conditions.push(eq(csrActivities.categoryId, String(req.query['category'])));
  const where = and(...conditions);

  const [rows, [c]] = await Promise.all([
    db.select().from(csrActivities).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(csrActivities).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function getCsrActivity(orgId: string, id: string) {
  const [row] = await db
    .select()
    .from(csrActivities)
    .where(and(eq(csrActivities.id, id), eq(csrActivities.organizationId, orgId)))
    .limit(1);
  return row ?? null;
}

export async function createCsrActivity(orgId: string, employeeId: string, body: CreateCsrActivityBody) {
  const [row] = await db
    .insert(csrActivities)
    .values({ ...body, organizationId: orgId, organizerId: employeeId })
    .returning();
  return row;
}

export async function updateCsrActivity(orgId: string, id: string, body: UpdateCsrActivityBody) {
  const [row] = await db
    .update(csrActivities)
    .set(body)
    .where(and(eq(csrActivities.id, id), eq(csrActivities.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function deleteCsrActivity(orgId: string, id: string) {
  const [row] = await db
    .delete(csrActivities)
    .where(and(eq(csrActivities.id, id), eq(csrActivities.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function joinCsrActivity(orgId: string, activityId: string, employeeId: string) {
  const [existing] = await db
    .select()
    .from(employeeParticipations)
    .where(and(eq(employeeParticipations.csrActivityId, activityId), eq(employeeParticipations.employeeId, employeeId)))
    .limit(1);

  if (existing) throw Object.assign(new Error('Already joined this activity'), { status: 409 });

  const [row] = await db
    .insert(employeeParticipations)
    .values({
      organizationId: orgId,
      csrActivityId: activityId,
      employeeId,
      approvalStatus: 'PENDING',
    })
    .returning();
  return row;
}
