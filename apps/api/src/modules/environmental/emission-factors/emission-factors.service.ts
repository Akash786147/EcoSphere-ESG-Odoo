import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { emissionFactors } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateEmissionFactorBody, UpdateEmissionFactorBody } from './emission-factors.schema.js';

export async function listEmissionFactors(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(emissionFactors.organizationId, orgId)];
  if (req.query['scope']) conditions.push(eq(emissionFactors.scope, String(req.query['scope'])));
  if (req.query['status']) conditions.push(eq(emissionFactors.status, String(req.query['status'])));
  const where = and(...conditions);

  const [rows, [c]] = await Promise.all([
    db.select().from(emissionFactors).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(emissionFactors).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function getEmissionFactor(orgId: string, id: string) {
  const [row] = await db
    .select()
    .from(emissionFactors)
    .where(and(eq(emissionFactors.id, id), eq(emissionFactors.organizationId, orgId)))
    .limit(1);
  return row ?? null;
}

export async function createEmissionFactor(orgId: string, body: CreateEmissionFactorBody) {
  const [row] = await db
    .insert(emissionFactors)
    .values({ ...body, organizationId: orgId, co2ePerUnit: String(body.co2ePerUnit) })
    .returning();
  return row;
}

export async function updateEmissionFactor(orgId: string, id: string, body: UpdateEmissionFactorBody) {
  const values: Record<string, unknown> = { ...body };
  if (body.co2ePerUnit !== undefined) values['co2ePerUnit'] = String(body.co2ePerUnit);
  const [row] = await db
    .update(emissionFactors)
    .set(values)
    .where(and(eq(emissionFactors.id, id), eq(emissionFactors.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function deleteEmissionFactor(orgId: string, id: string) {
  const [row] = await db
    .delete(emissionFactors)
    .where(and(eq(emissionFactors.id, id), eq(emissionFactors.organizationId, orgId)))
    .returning();
  return row ?? null;
}
