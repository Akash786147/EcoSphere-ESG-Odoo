import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { audits } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateAuditBody, UpdateAuditBody } from './audits.schema.js';

export async function listAudits(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(audits.organizationId, orgId)];
  if (req.query['status']) conditions.push(eq(audits.status, String(req.query['status'])));
  if (req.query['department']) conditions.push(eq(audits.departmentId, String(req.query['department'])));
  const where = and(...conditions);
  const [rows, [c]] = await Promise.all([
    db.select().from(audits).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(audits).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function getAudit(orgId: string, id: string) {
  const [row] = await db
    .select()
    .from(audits)
    .where(and(eq(audits.id, id), eq(audits.organizationId, orgId)))
    .limit(1);
  return row ?? null;
}

export async function createAudit(orgId: string, body: CreateAuditBody) {
  const [row] = await db.insert(audits).values({ ...body, organizationId: orgId }).returning();
  return row;
}

export async function updateAudit(orgId: string, id: string, body: UpdateAuditBody) {
  const [row] = await db
    .update(audits)
    .set(body)
    .where(and(eq(audits.id, id), eq(audits.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function completeAudit(orgId: string, id: string) {
  const [row] = await db
    .update(audits)
    .set({ status: 'COMPLETED' })
    .where(and(eq(audits.id, id), eq(audits.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function deleteAudit(orgId: string, id: string) {
  const [row] = await db.delete(audits).where(and(eq(audits.organizationId, orgId), eq(audits.id, id))).returning();
  return row ?? null;
}
