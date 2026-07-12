import { Request, Response } from 'express';
import * as svc from './erp-operations.service.js';
import { ok, created, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateErpOperationBody } from './erp-operations.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listErpOperations(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getErpOperation(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'ERP Operation');
}

export async function create(req: Request, res: Response) {
  const autoCalc = process.env['AUTO_EMISSION_CALC'] !== 'false';
  const row = await svc.createErpOperation(req.user!.orgId, req.body as CreateErpOperationBody, autoCalc);
  return created(res, row);
}
