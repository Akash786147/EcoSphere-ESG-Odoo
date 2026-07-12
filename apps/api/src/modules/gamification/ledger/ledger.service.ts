import { eq, and, count, desc, sql } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { pointsLedger, badges, challengeParticipations, streaks, employeeBadges, employees } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';

export async function addPointsToLedger(
  orgId: string,
  employeeId: string,
  points: number,
  entryType: string,
  source: string,
  sourceRefId?: string,
) {
  await db.insert(pointsLedger).values({
    organizationId: orgId,
    employeeId,
    points,
    entryType,
    source,
    sourceRefId,
  });
}

export async function getPointsBalance(orgId: string, employeeId: string): Promise<number> {
  const rows = await db
    .select({ points: pointsLedger.points, type: pointsLedger.entryType })
    .from(pointsLedger)
    .where(and(eq(pointsLedger.organizationId, orgId), eq(pointsLedger.employeeId, employeeId)));

  return rows.reduce((sum, r) => {
    return r.type === 'REDEEM' ? sum - r.points : sum + r.points;
  }, 0);
}

export async function getPointsLedger(orgId: string, employeeId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const where = and(eq(pointsLedger.organizationId, orgId), eq(pointsLedger.employeeId, employeeId));
  const [rows, [c]] = await Promise.all([
    db.select().from(pointsLedger).where(where).orderBy(desc(pointsLedger.createdAt)).limit(limit).offset(offset),
    db.select({ count: count() }).from(pointsLedger).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function checkAndAwardBadges(orgId: string, employeeId: string): Promise<void> {
  const orgBadges = await db.select().from(badges).where(eq(badges.organizationId, orgId));
  const totalXP = await getPointsBalance(orgId, employeeId);
  const [completedCount] = await db
    .select({ count: count() })
    .from(challengeParticipations)
    .where(
      and(
        eq(challengeParticipations.organizationId, orgId),
        eq(challengeParticipations.employeeId, employeeId),
        eq(challengeParticipations.approvalStatus, 'APPROVED'),
      ),
    );

  const [streak] = await db
    .select()
    .from(streaks)
    .where(and(eq(streaks.organizationId, orgId), eq(streaks.employeeId, employeeId)))
    .limit(1);

  for (const badge of orgBadges) {
    const rule = badge.unlockRule as { type: string; value: number };
    let qualifies = false;

    if (rule.type === 'XP_THRESHOLD') qualifies = totalXP >= rule.value;
    else if (rule.type === 'CHALLENGE_COUNT') qualifies = Number(completedCount?.count ?? 0) >= rule.value;
    else if (rule.type === 'STREAK_DAYS') qualifies = (streak?.currentStreakDays ?? 0) >= rule.value;

    if (qualifies) {
      const [alreadyHas] = await db
        .select()
        .from(employeeBadges)
        .where(and(eq(employeeBadges.badgeId, badge.id), eq(employeeBadges.employeeId, employeeId)))
        .limit(1);
      if (!alreadyHas) {
        await db.insert(employeeBadges).values({
          organizationId: orgId,
          badgeId: badge.id,
          employeeId,
          awardMode: 'AUTO',
        });
      }
    }
  }
}

export async function getEmployeeLeaderboard(orgId: string, topN = 20) {
  const rows = await db
    .select({
      employeeId: pointsLedger.employeeId,
      name: employees.name,
      totalXP: sql<number>`SUM(CASE WHEN ${pointsLedger.entryType} = 'REDEEM' THEN -${pointsLedger.points} ELSE ${pointsLedger.points} END)`.as(
        'totalXP',
      ),
    })
    .from(pointsLedger)
    .innerJoin(employees, eq(pointsLedger.employeeId, employees.id))
    .where(eq(pointsLedger.organizationId, orgId))
    .groupBy(pointsLedger.employeeId, employees.name)
    .orderBy(desc(sql`totalXP`))
    .limit(topN);

  return rows.map((r, i) => ({ rank: i + 1, ...r }));
}

export async function getMyRank(orgId: string, employeeId: string) {
  const board = await getEmployeeLeaderboard(orgId, 1000);
  const entry = board.find((r) => r.employeeId === employeeId);
  return { rank: entry?.rank ?? null, totalXP: entry?.totalXP ?? 0, total: board.length };
}

export async function getStreak(orgId: string, employeeId: string) {
  const [row] = await db
    .select()
    .from(streaks)
    .where(and(eq(streaks.organizationId, orgId), eq(streaks.employeeId, employeeId)))
    .limit(1);
  return row ?? { currentStreakDays: 0, longestStreakDays: 0, xpMultiplier: '1.00', lastActivityDate: null };
}
