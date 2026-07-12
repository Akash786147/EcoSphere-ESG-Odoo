import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { erpOperations, emissionFactors, carbonTransactions } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateErpOperationBody,UpdateErpOperationBody } from './erp-operations.schema.js';

export async function listErpOperations(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(erpOperations.organizationId, orgId)];
  if (req.query['type']) conditions.push(eq(erpOperations.type, String(req.query['type'])));
  if (req.query['department']) conditions.push(eq(erpOperations.departmentId, String(req.query['department'])));
  const where = and(...conditions);

  const [rows, [c]] = await Promise.all([
    db.select().from(erpOperations).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(erpOperations).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function getErpOperation(orgId: string, id: string) {
  const [row] = await db
    .select()
    .from(erpOperations)
    .where(and(eq(erpOperations.id, id), eq(erpOperations.organizationId, orgId)))
    .limit(1);
  return row ?? null;
}

export async function createErpOperation(orgId: string, body: CreateErpOperationBody, autoCalc: boolean) {
  const [op] = await db
    .insert(erpOperations)
    .values({
      ...body,
      organizationId: orgId,
      quantity: String(body.quantity),
      amount: String(body.amount),
    })
    .returning();

  if (autoCalc && op) {
    await autoCalculateEmission(orgId, op.id, op.type, op.quantity, op.departmentId, op.vendorId ?? undefined);
  }

  return op;
}

export async function autoCalculateEmission(
  orgId: string,
  operationId: string,
  type: string,
  quantity: string,
  departmentId: string,
  vendorId?: string,
) {
  const scope = ['MANUFACTURING', 'FLEET'].includes(type) ? 'SCOPE_1' : 'SCOPE_3';
  const [factor] = await db
    .select()
    .from(emissionFactors)
    .where(and(eq(emissionFactors.organizationId, orgId), eq(emissionFactors.scope, scope), eq(emissionFactors.status, 'ACTIVE')))
    .limit(1);

  if (!factor) return;

  const co2e = parseFloat(quantity) * parseFloat(factor.co2ePerUnit);
  await db.insert(carbonTransactions).values({
    organizationId: orgId,
    erpOperationId: operationId,
    emissionFactorId: factor.id,
    departmentId,
    vendorId,
    scope,
    activityValue: quantity,
    co2eCalculated: String(co2e),
    dataQuality: 'CALCULATED',
    entryMode: 'AUTO',
    transactionDate: new Date().toISOString().split('T')[0]!,
  });
}

export async function deleteErpOperation(orgId: string, id: string) {
  const [row] = await db.delete(erpOperations).where(and(eq(erpOperations.organizationId, orgId), eq(erpOperations.id, id))).returning();
  return row ?? null;
}

export async function updateErpOperation(orgId: string, id: string, body: UpdateErpOperationBody) {
  const { quantity, amount, ...rest } = body;
  const payload = {
    ...rest,
    ...(quantity !== undefined && { quantity: String(quantity) }),
    ...(amount !== undefined && { amount: String(amount) }),
  };
  const [row] = await db.update(erpOperations).set(payload).where(and(eq(erpOperations.organizationId, orgId), eq(erpOperations.id, id))).returning();
  return row ?? null;
}
