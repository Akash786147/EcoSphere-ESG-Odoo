import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { vendors } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateVendorBody, UpdateVendorBody } from './vendors.schema.js';

export async function listVendors(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const where = eq(vendors.organizationId, orgId);

  const [rows, [c]] = await Promise.all([
    db.select().from(vendors).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(vendors).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function createVendor(orgId: string, body: CreateVendorBody) {
  const [row] = await db.insert(vendors).values({ ...body, organizationId: orgId }).returning();
  return row;
}

export async function updateVendor(orgId: string, id: string, body: UpdateVendorBody) {
  const [row] = await db
    .update(vendors)
    .set(body)
    .where(and(eq(vendors.id, id), eq(vendors.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function deleteVendor(orgId: string, id: string) {
  const [row] = await db
    .delete(vendors)
    .where(and(eq(vendors.id, id), eq(vendors.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function getVendor(orgId: string, id: string) {
  const [row] = await db.select().from(vendors).where(and(eq(vendors.organizationId, orgId), eq(vendors.id, id))).limit(1);
  return row ?? null;
}
