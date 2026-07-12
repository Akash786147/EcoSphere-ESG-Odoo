import { Request, Response } from 'express';
import * as svc from './participations.service.js';
import { ok, notFound, paginated } from '../../../common/lib/response.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listParticipations(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function approve(req: Request, res: Response) {
  const row = await svc.approveParticipation(req.user!.orgId, (req.params['id'] as string), req.user!.sub);
  return ok(res, row);
}

export async function reject(req: Request, res: Response) {
  const row = await svc.rejectParticipation(req.user!.orgId, (req.params['id'] as string), req.user!.sub);
  return row ? ok(res, row) : notFound(res, 'Participation');
}
