import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { trainings, trainingCompletions } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateTrainingBody, UpdateTrainingBody, UpdateProgressBody } from './trainings.schema.js';

export async function listTrainings(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(trainings.organizationId, orgId)];
  if (req.query['type']) conditions.push(eq(trainings.trainingType, String(req.query['type'])));
  if (req.query['status']) conditions.push(eq(trainings.status, String(req.query['status'])));
  const where = and(...conditions);

  const [rows, [c]] = await Promise.all([
    db.select().from(trainings).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(trainings).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function createTraining(orgId: string, body: CreateTrainingBody) {
  const [row] = await db.insert(trainings).values({ ...body, organizationId: orgId }).returning();
  return row;
}

export async function updateTraining(orgId: string, id: string, body: UpdateTrainingBody) {
  const [row] = await db
    .update(trainings)
    .set(body)
    .where(and(eq(trainings.id, id), eq(trainings.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function enrollTraining(orgId: string, trainingId: string, employeeId: string) {
  const [existing] = await db
    .select()
    .from(trainingCompletions)
    .where(and(eq(trainingCompletions.trainingId, trainingId), eq(trainingCompletions.employeeId, employeeId)))
    .limit(1);
  if (existing) throw Object.assign(new Error('Already enrolled'), { status: 409 });

  const [row] = await db
    .insert(trainingCompletions)
    .values({
      organizationId: orgId,
      trainingId,
      employeeId,
      status: 'ENROLLED',
      progressPct: 0,
    })
    .returning();
  return row;
}

export async function updateTrainingProgress(orgId: string, id: string, body: UpdateProgressBody) {
  const updates: Record<string, unknown> = {
    progressPct: body.progressPct,
    status: body.progressPct >= 100 ? 'COMPLETED' : 'IN_PROGRESS',
  };
  if (body.progressPct >= 100) updates['completedAt'] = new Date();
  if (body.scorePct !== undefined) updates['scorePct'] = String(body.scorePct);

  const [row] = await db
    .update(trainingCompletions)
    .set(updates)
    .where(and(eq(trainingCompletions.id, id), eq(trainingCompletions.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function getTraining(orgId: string, id: string) {
  const [row] = await db.select().from(trainings).where(and(eq(trainings.organizationId, orgId), eq(trainings.id, id))).limit(1);
  return row ?? null;
}

export async function deleteTraining(orgId: string, id: string) {
  const [row] = await db.delete(trainings).where(and(eq(trainings.organizationId, orgId), eq(trainings.id, id))).returning();
  return row ?? null;
}
