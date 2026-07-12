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

export async function getOne(req: Request, res: Response) {
  const row = await svc.getCarbonTransaction(req.user!.orgId, req.params['id'] as string);
  return row ? ok(res, row) : notFound(res, 'Carbon Transaction');
}

export async function remove(req: Request, res: Response) {
  const row = await svc.deleteCarbonTransaction(req.user!.orgId, req.params['id'] as string);
  return row ? ok(res, row) : notFound(res, 'Carbon Transaction');
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateCarbonTransaction(req.user!.orgId, req.params['id'] as string, req.body as UpdateCarbonTransactionBody);
  return row ? ok(res, row) : notFound(res, 'Carbon Transaction');
}
