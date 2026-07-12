import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { badges, employeeBadges } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateBadgeBody, UpdateBadgeBody } from './badges.schema.js';

export async function listBadges(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const where = eq(badges.organizationId, orgId);
  const [rows, [c]] = await Promise.all([
    db.select().from(badges).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(badges).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function createBadge(orgId: string, body: CreateBadgeBody) {
  const [row] = await db.insert(badges).values({ ...body, organizationId: orgId }).returning();
  return row;
}

export async function updateBadge(orgId: string, id: string, body: UpdateBadgeBody) {
  const [row] = await db
    .update(badges)
    .set(body)
    .where(and(eq(badges.id, id), eq(badges.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function getMyBadges(orgId: string, employeeId: string) {
  return db
    .select({ badge: badges, awardedAt: employeeBadges.awardedAt })
    .from(employeeBadges)
    .innerJoin(badges, eq(employeeBadges.badgeId, badges.id))
    .where(and(eq(employeeBadges.organizationId, orgId), eq(employeeBadges.employeeId, employeeId)));
}

export async function awardBadgeManual(orgId: string, badgeId: string, employeeId: string) {
  const [existing] = await db
    .select()
    .from(employeeBadges)
    .where(and(eq(employeeBadges.badgeId, badgeId), eq(employeeBadges.employeeId, employeeId)))
    .limit(1);
  if (existing) throw Object.assign(new Error('Badge already awarded'), { status: 409 });

  const [row] = await db
    .insert(employeeBadges)
    .values({
      organizationId: orgId,
      badgeId,
      employeeId,
      awardMode: 'MANUAL',
    })
    .returning();
  return row;
}
