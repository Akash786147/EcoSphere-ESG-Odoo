import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { esgPolicies, policyAcknowledgements, employees } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreatePolicyBody, UpdatePolicyBody } from './policies.schema.js';

export async function listPolicies(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(esgPolicies.organizationId, orgId)];
  if (req.query['status']) conditions.push(eq(esgPolicies.status, String(req.query['status'])));
  const where = and(...conditions);
  const [rows, [c]] = await Promise.all([
    db.select().from(esgPolicies).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(esgPolicies).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function getPolicy(orgId: string, id: string) {
  const [row] = await db
    .select()
    .from(esgPolicies)
    .where(and(eq(esgPolicies.id, id), eq(esgPolicies.organizationId, orgId)))
    .limit(1);
  return row ?? null;
}

export async function createPolicy(orgId: string, body: CreatePolicyBody) {
  const [row] = await db
    .insert(esgPolicies)
    .values({ ...body, organizationId: orgId, status: 'DRAFT' })
    .returning();
  return row;
}

export async function updatePolicy(orgId: string, id: string, body: UpdatePolicyBody) {
  const [row] = await db
    .update(esgPolicies)
    .set(body)
    .where(and(eq(esgPolicies.id, id), eq(esgPolicies.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function publishPolicy(orgId: string, id: string) {
  const [row] = await db
    .update(esgPolicies)
    .set({ status: 'PUBLISHED' })
    .where(and(eq(esgPolicies.id, id), eq(esgPolicies.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function retirePolicy(orgId: string, id: string) {
  const [row] = await db
    .update(esgPolicies)
    .set({ status: 'RETIRED' })
    .where(and(eq(esgPolicies.id, id), eq(esgPolicies.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function acknowledgePolicy(orgId: string, policyId: string, employeeId: string) {
  const [policy] = await db
    .select()
    .from(esgPolicies)
    .where(and(eq(esgPolicies.id, policyId), eq(esgPolicies.organizationId, orgId)))
    .limit(1);
  if (!policy) throw Object.assign(new Error('Policy not found'), { status: 404 });

  const [existing] = await db
    .select()
    .from(policyAcknowledgements)
    .where(and(eq(policyAcknowledgements.policyId, policyId), eq(policyAcknowledgements.employeeId, employeeId)))
    .limit(1);
  if (existing) throw Object.assign(new Error('Policy already acknowledged'), { status: 409 });

  const [row] = await db
    .insert(policyAcknowledgements)
    .values({
      organizationId: orgId,
      policyId,
      employeeId,
      policyVersionAtAck: policy.version,
    })
    .returning();
  return row;
}

export async function getPolicyAckStatus(orgId: string, policyId: string) {
  const [totalEmployees] = await db
    .select({ count: count() })
    .from(employees)
    .where(and(eq(employees.organizationId, orgId), eq(employees.status, 'ACTIVE')));
  const [ackCount] = await db
    .select({ count: count() })
    .from(policyAcknowledgements)
    .where(eq(policyAcknowledgements.policyId, policyId));

  const total = Number(totalEmployees?.count ?? 0);
  const acked = Number(ackCount?.count ?? 0);
  return { total, acknowledged: acked, pending: total - acked, pct: total > 0 ? Math.round((acked / total) * 100) : 0 };
}
