import { Request, Response } from 'express';
import * as svc from './emission-factors.service.js';
import { ok, created, noContent, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateEmissionFactorBody, UpdateEmissionFactorBody } from './emission-factors.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listEmissionFactors(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getEmissionFactor(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Emission Factor');
}

export async function create(req: Request, res: Response) {
  const row = await svc.createEmissionFactor(req.user!.orgId, req.body as CreateEmissionFactorBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateEmissionFactor(req.user!.orgId, (req.params['id'] as string), req.body as UpdateEmissionFactorBody);
  return row ? ok(res, row) : notFound(res, 'Emission Factor');
}

export async function remove(req: Request, res: Response) {
  const row = await svc.deleteEmissionFactor(req.user!.orgId, (req.params['id'] as string));
  return row ? noContent(res) : notFound(res, 'Emission Factor');
}
