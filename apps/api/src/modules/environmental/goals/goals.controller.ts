import { Request, Response } from 'express';
import * as svc from './goals.service.js';
import { ok, created, noContent, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateGoalBody, UpdateGoalBody } from './goals.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listGoals(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getGoal(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Goal');
}

export async function create(req: Request, res: Response) {
  const row = await svc.createGoal(req.user!.orgId, req.body as CreateGoalBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateGoal(req.user!.orgId, (req.params['id'] as string), req.body as UpdateGoalBody);
  return row ? ok(res, row) : notFound(res, 'Goal');
}

export async function remove(req: Request, res: Response) {
  const row = await svc.deleteGoal(req.user!.orgId, (req.params['id'] as string));
  return row ? noContent(res) : notFound(res, 'Goal');
}

export async function forecast(req: Request, res: Response) {
  const data = await svc.getGoalForecast(req.user!.orgId, (req.params['id'] as string));
  return data ? ok(res, data) : notFound(res, 'Goal');
}
