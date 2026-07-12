import { Request, Response } from 'express';
import * as svc from './csr-activities.service.js';
import { ok, created, noContent, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateCsrActivityBody, UpdateCsrActivityBody } from './csr-activities.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listCsrActivities(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getCsrActivity(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'CSR Activity');
}

export async function create(req: Request, res: Response) {
  const row = await svc.createCsrActivity(req.user!.orgId, req.user!.sub, req.body as CreateCsrActivityBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateCsrActivity(req.user!.orgId, (req.params['id'] as string), req.body as UpdateCsrActivityBody);
  return row ? ok(res, row) : notFound(res, 'CSR Activity');
}

export async function remove(req: Request, res: Response) {
  const row = await svc.deleteCsrActivity(req.user!.orgId, (req.params['id'] as string));
  return row ? noContent(res) : notFound(res, 'CSR Activity');
}

export async function join(req: Request, res: Response) {
  const row = await svc.joinCsrActivity(req.user!.orgId, (req.params['id'] as string), req.user!.sub);
  return created(res, row);
}
