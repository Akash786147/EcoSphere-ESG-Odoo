import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { productEsgProfiles } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateProductBody, UpdateProductBody } from './products.schema.js';

export async function listProducts(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const where = eq(productEsgProfiles.organizationId, orgId);

  const [rows, [c]] = await Promise.all([
    db.select().from(productEsgProfiles).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(productEsgProfiles).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function createProduct(orgId: string, body: CreateProductBody) {
  const [row] = await db
    .insert(productEsgProfiles)
    .values({
      ...body,
      organizationId: orgId,
      carbonFootprintPerUnit: String(body.carbonFootprintPerUnit),
      recyclabilityPct: String(body.recyclabilityPct),
    })
    .returning();
  return row;
}

export async function updateProduct(orgId: string, id: string, body: UpdateProductBody) {
  const values: Record<string, unknown> = { ...body };
  if (body.carbonFootprintPerUnit !== undefined) values['carbonFootprintPerUnit'] = String(body.carbonFootprintPerUnit);
  if (body.recyclabilityPct !== undefined) values['recyclabilityPct'] = String(body.recyclabilityPct);

  const [row] = await db
    .update(productEsgProfiles)
    .set(values)
    .where(and(eq(productEsgProfiles.id, id), eq(productEsgProfiles.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function deleteProduct(orgId: string, id: string) {
  const [row] = await db
    .delete(productEsgProfiles)
    .where(and(eq(productEsgProfiles.id, id), eq(productEsgProfiles.organizationId, orgId)))
    .returning();
  return row ?? null;
}
