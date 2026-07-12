import { eq, and, count } from 'drizzle-orm';
import { db } from '../../../common/db/db.js';
import { categories } from '../../../common/db/schema/index.js';
import { parsePagination, buildMeta } from '../../../common/lib/pagination.js';
import type { Request } from 'express';
import type { CreateCategoryBody, UpdateCategoryBody } from './categories.schema.js';

export async function listCategories(orgId: string, req: Request) {
  const { page, limit, offset } = parsePagination(req);
  const conditions = [eq(categories.organizationId, orgId)];
  if (req.query['type']) conditions.push(eq(categories.type, String(req.query['type'])));
  const where = and(...conditions);

  const [rows, [c]] = await Promise.all([
    db.select().from(categories).where(where).limit(limit).offset(offset),
    db.select({ count: count() }).from(categories).where(where),
  ]);
  return { rows, meta: buildMeta(page, limit, Number(c?.count ?? 0)) };
}

export async function createCategory(orgId: string, body: CreateCategoryBody) {
  const [row] = await db.insert(categories).values({ ...body, organizationId: orgId }).returning();
  return row;
}

export async function updateCategory(orgId: string, id: string, body: UpdateCategoryBody) {
  const [row] = await db
    .update(categories)
    .set(body)
    .where(and(eq(categories.id, id), eq(categories.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function deleteCategory(orgId: string, id: string) {
  const [row] = await db
    .delete(categories)
    .where(and(eq(categories.id, id), eq(categories.organizationId, orgId)))
    .returning();
  return row ?? null;
}

export async function getCategory(orgId: string, id: string) {
  const [row] = await db.select().from(categories).where(and(eq(categories.organizationId, orgId), eq(categories.id, id))).limit(1);
  return row ?? null;
}
