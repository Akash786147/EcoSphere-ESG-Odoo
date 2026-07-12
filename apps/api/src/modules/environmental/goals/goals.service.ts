import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { environmentalGoals } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateGoalBody, UpdateGoalBody } from './goals.schema.js';

export async function listGoals(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const where = eq(environmentalGoals.organizationId, orgId);

  const [rows, [c]] = await Promise.all([
    db.select().from(environmentalGoals).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(environmentalGoals).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function getGoal(orgId: string, id: string) {
  const [row] = await db
    .select()
    .from(environmentalGoals)
    .where(and(eq(environmentalGoals.id, id), eq(environmentalGoals.organizationId, orgId)))
    .limit(1);
  return row ?? null;
}

export async function createGoal(orgId: string, body: CreateGoalBody) {
  const [row] = await db
    .insert(environmentalGoals)
    .values({
      ...body,
      organizationId: orgId,
      targetValue: String(body.targetValue),
      baselineValue: String(body.baselineValue),
    })
    .returning();
  return row;
}

export async function updateGoal(orgId: string, id: string, body: UpdateGoalBody) {
  const values: Record<string, unknown> = { ...body };
  if (body.targetValue !== undefined) values['targetValue'] = String(body.targetValue);
  if (body.baselineValue !== undefined) values['baselineValue'] = String(body.baselineValue);

  const [row] = await db
    .update(environmentalGoals)
    .set(values)
    .where(and(eq(environmentalGoals.id, id), eq(environmentalGoals.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function deleteGoal(orgId: string, id: string) {
  const [row] = await db
    .delete(environmentalGoals)
    .where(and(eq(environmentalGoals.id, id), eq(environmentalGoals.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function getGoalForecast(orgId: string, id: string) {
  const goal = await getGoal(orgId, id);
  if (!goal) return null;

  const now = new Date();
  const start = new Date(goal.startDate);
  const target = new Date(goal.targetDate);
  const elapsedDays = Math.max(1, Math.floor((now.getTime() - start.getTime()) / 86400000));
  const totalDays = Math.max(1, Math.floor((target.getTime() - start.getTime()) / 86400000));

  const baseline = parseFloat(goal.baselineValue);
  const targetVal = parseFloat(goal.targetValue);

  const projectedCurrent = baseline + (targetVal - baseline) * (elapsedDays / totalDays);
  const runRate = (projectedCurrent - baseline) / elapsedDays;

  const daysToTarget = runRate !== 0 ? (targetVal - baseline) / runRate : null;
  const projectedBreachDate = daysToTarget
    ? new Date(start.getTime() + daysToTarget * 86400000).toISOString().split('T')[0]
    : null;

  return {
    goalId: id,
    projectedCurrentValue: Math.round(projectedCurrent * 100) / 100,
    targetValue: targetVal,
    baselineValue: baseline,
    projectedBreachDate,
    onTrack: projectedBreachDate ? new Date(projectedBreachDate) <= target : false,
  };
}
