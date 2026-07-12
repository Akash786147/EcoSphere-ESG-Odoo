import { Request, Response } from 'express';
import * as svc from './categories.service.js';
import { ok, created, noContent, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateCategoryBody, UpdateCategoryBody } from './categories.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listCategories(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function create(req: Request, res: Response) {
  const row = await svc.createCategory(req.user!.orgId, req.body as CreateCategoryBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateCategory(req.user!.orgId, (req.params['id'] as string), req.body as UpdateCategoryBody);
  return row ? ok(res, row) : notFound(res, 'Category');
}

export async function remove(req: Request, res: Response) {
  const row = await svc.deleteCategory(req.user!.orgId, (req.params['id'] as string));
  return row ? noContent(res) : notFound(res, 'Category');
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getCategory(req.user!.orgId, req.params['id'] as string);
  return row ? ok(res, row) : notFound(res, 'Category');
}
