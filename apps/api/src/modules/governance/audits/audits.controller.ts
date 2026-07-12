import { Request, Response } from 'express';
import * as svc from './audits.service.js';
import { ok, created, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateAuditBody, UpdateAuditBody } from './audits.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listAudits(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getAudit(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Audit');
}

export async function create(req: Request, res: Response) {
  const row = await svc.createAudit(req.user!.orgId, req.body as CreateAuditBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateAudit(req.user!.orgId, (req.params['id'] as string), req.body as UpdateAuditBody);
  return row ? ok(res, row) : notFound(res, 'Audit');
}

export async function complete(req: Request, res: Response) {
  const row = await svc.completeAudit(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Audit');
}
