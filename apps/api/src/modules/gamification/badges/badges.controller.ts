import { Request, Response } from 'express';
import * as svc from './badges.service.js';
import { ok, created, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateBadgeBody, UpdateBadgeBody } from './badges.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listBadges(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function create(req: Request, res: Response) {
  const row = await svc.createBadge(req.user!.orgId, req.body as CreateBadgeBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateBadge(req.user!.orgId, (req.params['id'] as string), req.body as UpdateBadgeBody);
  return row ? ok(res, row) : notFound(res, 'Badge');
}

export async function mine(req: Request, res: Response) {
  const data = await svc.getMyBadges(req.user!.orgId, req.user!.sub);
  return ok(res, data);
}

export async function award(req: Request, res: Response) {
  const { employeeId } = req.body;
  const row = await svc.awardBadgeManual(req.user!.orgId, (req.params['id'] as string), employeeId);
  return created(res, row);
}
