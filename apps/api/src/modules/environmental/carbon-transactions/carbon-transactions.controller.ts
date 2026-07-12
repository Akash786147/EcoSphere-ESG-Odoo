import { Request, Response } from 'express';
import * as svc from './carbon-transactions.service.js';
import { ok, created, paginated } from '../../../common/lib/response.js';
import type { CreateCarbonTransactionBody } from './carbon-transactions.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listCarbonTransactions(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function create(req: Request, res: Response) {
  const row = await svc.createCarbonTransaction(req.user!.orgId, req.body as CreateCarbonTransactionBody);
  return created(res, row);
}

export async function getSummary(req: Request, res: Response) {
  const data = await svc.getCarbonSummary(req.user!.orgId);
  return ok(res, data);
}
