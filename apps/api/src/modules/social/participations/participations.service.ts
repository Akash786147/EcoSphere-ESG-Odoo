import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { employeeParticipations, csrActivities } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';

export async function listParticipations(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(employeeParticipations.organizationId, orgId)];
  if (req.query['status']) conditions.push(eq(employeeParticipations.approvalStatus, String(req.query['status'])));
  if (req.query['employee']) conditions.push(eq(employeeParticipations.employeeId, String(req.query['employee'])));
  const where = and(...conditions);

  const [rows, [c]] = await Promise.all([
    db.select().from(employeeParticipations).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(employeeParticipations).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function approveParticipation(orgId: string, id: string, approverId: string) {
  const [participation] = await db
    .select()
    .from(employeeParticipations)
    .where(and(eq(employeeParticipations.id, id), eq(employeeParticipations.organizationId, orgId)))
    .limit(1);

  if (!participation) throw Object.assign(new Error('Participation not found'), { status: 404 });
  if (participation.employeeId === approverId) {
    throw Object.assign(new Error('Cannot approve your own participation'), { status: 403 });
  }

  const [activity] = await db
    .select()
    .from(csrActivities)
    .where(eq(csrActivities.id, participation.csrActivityId))
    .limit(1);

  const [row] = await db
    .update(employeeParticipations)
    .set({
      approvalStatus: 'APPROVED',
      approvedBy: approverId,
      pointsEarned: activity?.pointsOnCompletion ?? 0,
      completionDate: new Date().toISOString().split('T')[0] as string,
    })
    .where(eq(employeeParticipations.id, id))
    .returning();

  return row;
}

export async function rejectParticipation(orgId: string, id: string, approverId: string) {
  const [row] = await db
    .update(employeeParticipations)
    .set({ approvalStatus: 'REJECTED', approvedBy: approverId })
    .where(and(eq(employeeParticipations.id, id), eq(employeeParticipations.organizationId, orgId)))
    .returning();
  return row ?? null;
}
