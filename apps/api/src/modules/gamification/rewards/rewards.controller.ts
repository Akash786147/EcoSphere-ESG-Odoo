import { Request, Response } from 'express';
import * as svc from './rewards.service.js';
import { ok, created, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateRewardBody, UpdateRewardBody } from './rewards.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listRewards(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function create(req: Request, res: Response) {
  const row = await svc.createReward(req.user!.orgId, req.body as CreateRewardBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateReward(req.user!.orgId, (req.params['id'] as string), req.body as UpdateRewardBody);
  return row ? ok(res, row) : notFound(res, 'Reward');
}

export async function redeem(req: Request, res: Response) {
  const row = await svc.redeemReward(req.user!.orgId, (req.params['id'] as string), req.user!.sub);
  return created(res, row);
}

export async function redemptions(req: Request, res: Response) {
  const employeeId = req.query['employee'] ? String(req.query['employee']) : undefined;
  const rows = await svc.listRedemptions(req.user!.orgId, employeeId, req);
  return ok(res, rows);
}
