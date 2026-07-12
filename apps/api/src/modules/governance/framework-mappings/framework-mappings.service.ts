import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { frameworkMappings } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateFrameworkMappingBody } from './framework-mappings.schema.js';

export async function listFrameworkMappings(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(frameworkMappings.organizationId, orgId)];
  if (req.query['framework']) conditions.push(eq(frameworkMappings.framework, String(req.query['framework'])));
  const where = and(...conditions);
  const [rows, [c]] = await Promise.all([
    db.select().from(frameworkMappings).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(frameworkMappings).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function getFrameworkMapping(orgId: string, id: string) {
  const [row] = await db.select().from(frameworkMappings).where(and(eq(frameworkMappings.organizationId, orgId), eq(frameworkMappings.id, id))).limit(1);
  return row ?? null;
}

export async function createFrameworkMapping(orgId: string, body: CreateFrameworkMappingBody) {
  const [row] = await db.insert(frameworkMappings).values({ ...body, organizationId: orgId }).returning();
  return row;
}

export async function deleteFrameworkMapping(orgId: string, id: string) {
  const [row] = await db.delete(frameworkMappings).where(and(eq(frameworkMappings.organizationId, orgId), eq(frameworkMappings.id, id))).returning();
  return row ?? null;
}
