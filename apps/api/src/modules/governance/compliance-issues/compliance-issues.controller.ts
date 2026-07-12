import { Request, Response } from 'express';
import * as svc from './compliance-issues.service.js';
import { ok, created, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateComplianceIssueBody, UpdateComplianceIssueBody, ReassignBody } from './compliance-issues.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listComplianceIssues(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function overdue(req: Request, res: Response) {
  const data = await svc.listOverdueIssues(req.user!.orgId);
  return ok(res, data);
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getComplianceIssue(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Compliance Issue');
}

export async function create(req: Request, res: Response) {
  const row = await svc.createComplianceIssue(req.user!.orgId, req.body as CreateComplianceIssueBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateComplianceIssue(req.user!.orgId, (req.params['id'] as string), req.body as UpdateComplianceIssueBody);
  return row ? ok(res, row) : notFound(res, 'Compliance Issue');
}

export async function reassign(req: Request, res: Response) {
  const row = await svc.reassignIssue(req.user!.orgId, (req.params['id'] as string), req.body as ReassignBody);
  return row ? ok(res, row) : notFound(res, 'Compliance Issue');
}

export async function resolve(req: Request, res: Response) {
  const row = await svc.resolveIssue(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Compliance Issue');
}

export async function close(req: Request, res: Response) {
  const row = await svc.closeIssue(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Compliance Issue');
}

export async function remove(req: Request, res: Response) {
  const row = await svc.deleteComplianceIssue(req.user!.orgId, req.params['id'] as string);
  return row ? ok(res, row) : notFound(res, 'Compliance Issue');
}
