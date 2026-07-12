import { Request, Response } from 'express';
import * as svc from './products.service.js';
import { ok, created, noContent, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateProductBody, UpdateProductBody } from './products.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listProducts(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function create(req: Request, res: Response) {
  const row = await svc.createProduct(req.user!.orgId, req.body as CreateProductBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateProduct(req.user!.orgId, (req.params['id'] as string), req.body as UpdateProductBody);
  return row ? ok(res, row) : notFound(res, 'Product');
}

export async function remove(req: Request, res: Response) {
  const row = await svc.deleteProduct(req.user!.orgId, (req.params['id'] as string));
  return row ? noContent(res) : notFound(res, 'Product');
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getProduct(req.user!.orgId, req.params['id'] as string);
  return row ? ok(res, row) : notFound(res, 'Product');
}
