import { Request, Response } from 'express';
import * as svc from './policies.service.js';
import { ok, created, notFound, paginated } from '../../../common/lib/response.js';
import type { CreatePolicyBody, UpdatePolicyBody } from './policies.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listPolicies(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getPolicy(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Policy');
}

export async function create(req: Request, res: Response) {
  const row = await svc.createPolicy(req.user!.orgId, req.body as CreatePolicyBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updatePolicy(req.user!.orgId, (req.params['id'] as string), req.body as UpdatePolicyBody);
  return row ? ok(res, row) : notFound(res, 'Policy');
}

export async function publish(req: Request, res: Response) {
  const row = await svc.publishPolicy(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Policy');
}

export async function retire(req: Request, res: Response) {
  const row = await svc.retirePolicy(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Policy');
}

export async function acknowledge(req: Request, res: Response) {
  const row = await svc.acknowledgePolicy(req.user!.orgId, (req.params['id'] as string), req.user!.sub);
  return created(res, row);
}

export async function ackStatus(req: Request, res: Response) {
  const data = await svc.getPolicyAckStatus(req.user!.orgId, (req.params['id'] as string));
  return ok(res, data);
}

export async function remove(req: Request, res: Response) {
  const row = await svc.deletePolicy(req.user!.orgId, req.params['id'] as string);
  return row ? ok(res, row) : notFound(res, 'Policy');
}
