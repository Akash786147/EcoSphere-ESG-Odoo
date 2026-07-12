import { Request, Response } from 'express';
import * as svc from './challenges.service.js';
import { ok, created, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateChallengeBody, UpdateChallengeBody, UpdateProgressBody } from './challenges.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listChallenges(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getChallenge(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Challenge');
}

export async function create(req: Request, res: Response) {
  const row = await svc.createChallenge(req.user!.orgId, req.body as CreateChallengeBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateChallenge(req.user!.orgId, (req.params['id'] as string), req.body as UpdateChallengeBody);
  return row ? ok(res, row) : notFound(res, 'Challenge');
}

export async function transition(req: Request, res: Response) {
  const row = await svc.transitionChallenge(req.user!.orgId, (req.params['id'] as string), req.body.status);
  return row ? ok(res, row) : notFound(res, 'Challenge');
}

export async function join(req: Request, res: Response) {
  const row = await svc.joinChallenge(req.user!.orgId, (req.params['id'] as string), req.user!.sub);
  return created(res, row);
}

export async function updateProgress(req: Request, res: Response) {
  const row = await svc.updateChallengeProgress(req.user!.orgId, (req.params['id'] as string), req.body as UpdateProgressBody);
  return row ? ok(res, row) : notFound(res, 'Challenge Participation');
}

export async function approve(req: Request, res: Response) {
  const row = await svc.approveChallengeParticipation(req.user!.orgId, (req.params['id'] as string), req.user!.sub);
  return ok(res, row);
}

export async function reject(req: Request, res: Response) {
  const row = await svc.rejectChallengeParticipation(req.user!.orgId, (req.params['id'] as string), req.user!.sub);
  return row ? ok(res, row) : notFound(res, 'Challenge Participation');
}
