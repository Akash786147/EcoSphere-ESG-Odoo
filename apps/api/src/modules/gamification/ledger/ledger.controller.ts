import { Request, Response } from 'express';
import * as svc from './ledger.service.js';
import { ok, paginated } from '../../../common/lib/response.js';

export async function getLedger(req: Request, res: Response) {
  const { rows, meta } = await svc.getPointsLedger(req.user!.orgId, req.user!.sub, req);
  return paginated(res, rows, meta);
}

export async function getBalance(req: Request, res: Response) {
  const balance = await svc.getPointsBalance(req.user!.orgId, req.user!.sub);
  return ok(res, { balance });
}

export async function getLeaderboard(req: Request, res: Response) {
  const data = await svc.getEmployeeLeaderboard(req.user!.orgId, 50);
  return ok(res, data);
}

export async function getRank(req: Request, res: Response) {
  const data = await svc.getMyRank(req.user!.orgId, req.user!.sub);
  return ok(res, data);
}

export async function getMyStreak(req: Request, res: Response) {
  const data = await svc.getStreak(req.user!.orgId, req.user!.sub);
  return ok(res, data);
}
