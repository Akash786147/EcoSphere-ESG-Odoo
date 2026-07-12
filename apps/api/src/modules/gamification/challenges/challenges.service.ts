import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { challenges, challengeParticipations } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import { addPointsToLedger, checkAndAwardBadges } from '../ledger/ledger.service.js';
import type { Request } from 'express';
import type { CreateChallengeBody, UpdateChallengeBody, UpdateProgressBody } from './challenges.schema.js';

export async function listChallenges(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(challenges.organizationId, orgId)];
  if (req.query['status']) conditions.push(eq(challenges.status, String(req.query['status'])));
  const where = and(...conditions);
  const [rows, [c]] = await Promise.all([
    db.select().from(challenges).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(challenges).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function getChallenge(orgId: string, id: string) {
  const [row] = await db
    .select()
    .from(challenges)
    .where(and(eq(challenges.id, id), eq(challenges.organizationId, orgId)))
    .limit(1);
  return row ?? null;
}

export async function createChallenge(orgId: string, body: CreateChallengeBody) {
  const [row] = await db.insert(challenges).values({ ...body, organizationId: orgId, status: 'DRAFT' }).returning();
  return row;
}

export async function updateChallenge(orgId: string, id: string, body: UpdateChallengeBody) {
  const [row] = await db
    .update(challenges)
    .set(body)
    .where(and(eq(challenges.id, id), eq(challenges.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function transitionChallenge(orgId: string, id: string, targetStatus: string) {
  const transitions: Record<string, string> = {
    activate: 'ACTIVE',
    'submit-review': 'UNDER_REVIEW',
    complete: 'COMPLETED',
    archive: 'ARCHIVED',
  };
  const status = transitions[targetStatus];
  if (!status) throw Object.assign(new Error('Invalid transition'), { status: 400 });

  const [row] = await db
    .update(challenges)
    .set({ status })
    .where(and(eq(challenges.id, id), eq(challenges.organizationId, orgId)))
    .returning();

  if (status === 'COMPLETED' && row) {
    const participants = await db
      .select()
      .from(challengeParticipations)
      .where(and(eq(challengeParticipations.challengeId, id), eq(challengeParticipations.approvalStatus, 'APPROVED')));

    for (const p of participants) {
      await db
        .update(challengeParticipations)
        .set({ xpAwarded: row.xpReward })
        .where(eq(challengeParticipations.id, p.id));
      await addPointsToLedger(orgId, p.employeeId, row.xpReward, 'EARN', 'CHALLENGE', id);
      await checkAndAwardBadges(orgId, p.employeeId);
    }
  }

  return row ?? null;
}

export async function joinChallenge(orgId: string, challengeId: string, employeeId: string, departmentId?: string) {
  const [existing] = await db
    .select()
    .from(challengeParticipations)
    .where(and(eq(challengeParticipations.challengeId, challengeId), eq(challengeParticipations.employeeId, employeeId)))
    .limit(1);
  if (existing) throw Object.assign(new Error('Already joined'), { status: 409 });

  const [row] = await db
    .insert(challengeParticipations)
    .values({
      organizationId: orgId,
      challengeId,
      employeeId,
      departmentId,
      progressPct: 0,
      approvalStatus: 'PENDING',
    })
    .returning();
  return row;
}

export async function updateChallengeProgress(orgId: string, id: string, body: UpdateProgressBody) {
  const [row] = await db
    .update(challengeParticipations)
    .set({ progressPct: body.progressPct })
    .where(and(eq(challengeParticipations.id, id), eq(challengeParticipations.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function approveChallengeParticipation(orgId: string, id: string, approverId: string) {
  const [p] = await db
    .select()
    .from(challengeParticipations)
    .where(and(eq(challengeParticipations.id, id), eq(challengeParticipations.organizationId, orgId)))
    .limit(1);
  if (!p) throw Object.assign(new Error('Participation not found'), { status: 404 });
  if (p.employeeId === approverId) throw Object.assign(new Error('Cannot approve your own submission'), { status: 403 });

  const [row] = await db
    .update(challengeParticipations)
    .set({
      approvalStatus: 'APPROVED',
      approvedBy: approverId,
      completedAt: new Date(),
    })
    .where(eq(challengeParticipations.id, id))
    .returning();
  return row;
}

export async function rejectChallengeParticipation(orgId: string, id: string, approverId: string) {
  const [row] = await db
    .update(challengeParticipations)
    .set({ approvalStatus: 'REJECTED', approvedBy: approverId })
    .where(and(eq(challengeParticipations.id, id), eq(challengeParticipations.organizationId, orgId)))
    .returning();
  return row ?? null;
}
