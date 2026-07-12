import { Request, Response } from 'express';
import * as svc from './vendors.service.js';
import { ok, created, noContent, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateVendorBody, UpdateVendorBody } from './vendors.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listVendors(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function create(req: Request, res: Response) {
  const row = await svc.createVendor(req.user!.orgId, req.body as CreateVendorBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateVendor(req.user!.orgId, (req.params['id'] as string), req.body as UpdateVendorBody);
  return row ? ok(res, row) : notFound(res, 'Vendor');
}

export async function remove(req: Request, res: Response) {
  const row = await svc.deleteVendor(req.user!.orgId, (req.params['id'] as string));
  return row ? noContent(res) : notFound(res, 'Vendor');
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getVendor(req.user!.orgId, req.params['id'] as string);
  return row ? ok(res, row) : notFound(res, 'Vendor');
}
