import { Request, Response } from 'express';
import * as svc from './trainings.service.js';
import { ok, created, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateTrainingBody, UpdateTrainingBody, UpdateProgressBody } from './trainings.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listTrainings(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function create(req: Request, res: Response) {
  const row = await svc.createTraining(req.user!.orgId, req.body as CreateTrainingBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateTraining(req.user!.orgId, (req.params['id'] as string), req.body as UpdateTrainingBody);
  return row ? ok(res, row) : notFound(res, 'Training');
}

export async function enroll(req: Request, res: Response) {
  const row = await svc.enrollTraining(req.user!.orgId, (req.params['id'] as string), req.user!.sub);
  return created(res, row);
}

export async function updateProgress(req: Request, res: Response) {
  const row = await svc.updateTrainingProgress(req.user!.orgId, (req.params['id'] as string), req.body as UpdateProgressBody);
  return row ? ok(res, row) : notFound(res, 'Training Completion');
}
