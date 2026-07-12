import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { rewards, rewardRedemptions } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import { getPointsBalance, addPointsToLedger } from '../ledger/ledger.service.js';
import type { Request } from 'express';
import type { CreateRewardBody, UpdateRewardBody } from './rewards.schema.js';

export async function listRewards(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const where = eq(rewards.organizationId, orgId);
  const [rows, [c]] = await Promise.all([
    db.select().from(rewards).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(rewards).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function createReward(orgId: string, body: CreateRewardBody) {
  const [row] = await db.insert(rewards).values({ ...body, organizationId: orgId }).returning();
  return row;
}

export async function updateReward(orgId: string, id: string, body: UpdateRewardBody) {
  const [row] = await db
    .update(rewards)
    .set(body)
    .where(and(eq(rewards.id, id), eq(rewards.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function redeemReward(orgId: string, rewardId: string, employeeId: string) {
  const [reward] = await db
    .select()
    .from(rewards)
    .where(and(eq(rewards.id, rewardId), eq(rewards.organizationId, orgId)))
    .limit(1);
  if (!reward) throw Object.assign(new Error('Reward not found'), { status: 404 });
  if (reward.stock <= 0) throw Object.assign(new Error('Out of stock'), { status: 409 });

  const balance = await getPointsBalance(orgId, employeeId);
  if (balance < reward.pointsRequired) {
    throw Object.assign(new Error(`Insufficient points. Need ${reward.pointsRequired}, have ${balance}`), { status: 422 });
  }

  await db.update(rewards).set({ stock: reward.stock - 1 }).where(eq(rewards.id, rewardId));
  await addPointsToLedger(orgId, employeeId, reward.pointsRequired, 'REDEEM', 'REDEMPTION', rewardId);

  const [redemption] = await db
    .insert(rewardRedemptions)
    .values({
      organizationId: orgId,
      rewardId,
      employeeId,
      pointsSpent: reward.pointsRequired,
      status: 'REQUESTED',
    })
    .returning();
  return redemption;
}

export async function listRedemptions(orgId: string, employeeId?: string, req?: Request) {
  const conditions = [eq(rewardRedemptions.organizationId, orgId)];
  if (employeeId) conditions.push(eq(rewardRedemptions.employeeId, employeeId));
  return db.select().from(rewardRedemptions).where(and(...conditions));
}
