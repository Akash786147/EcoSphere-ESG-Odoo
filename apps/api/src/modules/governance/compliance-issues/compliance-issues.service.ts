import { eq, and, count, lt } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { complianceIssues } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateComplianceIssueBody, UpdateComplianceIssueBody, ReassignBody } from './compliance-issues.schema.js';

export async function listComplianceIssues(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(complianceIssues.organizationId, orgId)];
  if (req.query['severity']) conditions.push(eq(complianceIssues.severity, String(req.query['severity'])));
  if (req.query['status']) conditions.push(eq(complianceIssues.status, String(req.query['status'])));
  if (req.query['owner']) conditions.push(eq(complianceIssues.ownerId, String(req.query['owner'])));
  if (req.query['overdue'] === 'true') {
    conditions.push(eq(complianceIssues.overdueFlagged, true));
  }
  const where = and(...conditions);
  const [rows, [c]] = await Promise.all([
    db.select().from(complianceIssues).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(complianceIssues).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function getComplianceIssue(orgId: string, id: string) {
  const [row] = await db
    .select()
    .from(complianceIssues)
    .where(and(eq(complianceIssues.id, id), eq(complianceIssues.organizationId, orgId)))
    .limit(1);
  return row ?? null;
}

export async function createComplianceIssue(orgId: string, body: CreateComplianceIssueBody) {
  const [row] = await db.insert(complianceIssues).values({ ...body, organizationId: orgId }).returning();
  return row;
}

export async function updateComplianceIssue(orgId: string, id: string, body: UpdateComplianceIssueBody) {
  const [row] = await db
    .update(complianceIssues)
    .set(body)
    .where(and(eq(complianceIssues.id, id), eq(complianceIssues.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function reassignIssue(orgId: string, id: string, body: ReassignBody) {
  const [row] = await db
    .update(complianceIssues)
    .set({ ownerId: body.ownerId })
    .where(and(eq(complianceIssues.id, id), eq(complianceIssues.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function resolveIssue(orgId: string, id: string) {
  const [row] = await db
    .update(complianceIssues)
    .set({ status: 'RESOLVED' })
    .where(and(eq(complianceIssues.id, id), eq(complianceIssues.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function closeIssue(orgId: string, id: string) {
  const [row] = await db
    .update(complianceIssues)
    .set({ status: 'CLOSED' })
    .where(and(eq(complianceIssues.id, id), eq(complianceIssues.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function listOverdueIssues(orgId: string) {
  const today = new Date().toISOString().split('T')[0]!;
  return db
    .select()
    .from(complianceIssues)
    .where(and(eq(complianceIssues.organizationId, orgId), eq(complianceIssues.status, 'OPEN'), lt(complianceIssues.dueDate, today)));
}
