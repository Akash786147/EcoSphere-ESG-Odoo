import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { carbonTransactions } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import { getEmissionFactor } from '../emission-factors/emission-factors.service.js';
import type { Request } from 'express';
import type { CreateCarbonTransactionBody } from './carbon-transactions.schema.js';

export async function listCarbonTransactions(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(carbonTransactions.organizationId, orgId)];
  if (req.query['scope']) conditions.push(eq(carbonTransactions.scope, String(req.query['scope'])));
  if (req.query['department']) conditions.push(eq(carbonTransactions.departmentId, String(req.query['department'])));
  const where = and(...conditions);

  const [rows, [c]] = await Promise.all([
    db.select().from(carbonTransactions).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(carbonTransactions).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function createCarbonTransaction(orgId: string, body: CreateCarbonTransactionBody) {
  const factor = await getEmissionFactor(orgId, body.emissionFactorId);
  if (!factor) throw Object.assign(new Error('Emission factor not found'), { status: 404 });

  const co2e = body.activityValue * parseFloat(factor.co2ePerUnit);
  const [row] = await db
    .insert(carbonTransactions)
    .values({
      ...body,
      organizationId: orgId,
      activityValue: String(body.activityValue),
      co2eCalculated: String(co2e),
      entryMode: 'MANUAL',
    })
    .returning();
  return row;
}

export async function getCarbonSummary(orgId: string) {
  const rows = await db
    .select({
      scope: carbonTransactions.scope,
      departmentId: carbonTransactions.departmentId,
      co2e: carbonTransactions.co2eCalculated,
    })
    .from(carbonTransactions)
    .where(eq(carbonTransactions.organizationId, orgId));

  const byScope: Record<string, number> = {};
  const byDept: Record<string, number> = {};
  let total = 0;

  for (const r of rows) {
    const v = parseFloat(r.co2e);
    total += v;
    byScope[r.scope] = (byScope[r.scope] ?? 0) + v;
    byDept[r.departmentId] = (byDept[r.departmentId] ?? 0) + v;
  }
  return { totalCo2e: total, byScope, byDepartment: byDept };
}

export async function getCarbonTransaction(orgId: string, id: string) {
  const [row] = await db.select().from(carbonTransactions).where(and(eq(carbonTransactions.organizationId, orgId), eq(carbonTransactions.id, id))).limit(1);
  return row ?? null;
}

export async function deleteCarbonTransaction(orgId: string, id: string) {
  const [row] = await db.delete(carbonTransactions).where(and(eq(carbonTransactions.organizationId, orgId), eq(carbonTransactions.id, id))).returning();
  return row ?? null;
}

export async function updateCarbonTransaction(orgId: string, id: string, body: UpdateCarbonTransactionBody) {
  const [row] = await db.update(carbonTransactions).set(body).where(and(eq(carbonTransactions.organizationId, orgId), eq(carbonTransactions.id, id))).returning();
  return row ?? null;
}
