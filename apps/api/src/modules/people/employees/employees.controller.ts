import { Request, Response } from 'express';
import * as svc from './employees.service.js';
import { ok, created, noContent, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateEmployeeBody, UpdateEmployeeBody, ChangeRoleBody, DiversityUpdateBody } from './employees.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listEmployees(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getEmployee(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Employee');
}

export async function create(req: Request, res: Response) {
  const row = await svc.createEmployee(req.user!.orgId, req.body as CreateEmployeeBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateEmployee(req.user!.orgId, (req.params['id'] as string), req.body as UpdateEmployeeBody);
  return row ? ok(res, row) : notFound(res, 'Employee');
}

export async function remove(req: Request, res: Response) {
  const row = await svc.deleteEmployee(req.user!.orgId, (req.params['id'] as string));
  return row ? noContent(res) : notFound(res, 'Employee');
}

export async function changeRole(req: Request, res: Response) {
  const row = await svc.changeRole(req.user!.orgId, (req.params['id'] as string), req.body as ChangeRoleBody);
  return row ? ok(res, row) : notFound(res, 'Employee');
}

export async function updateDiversity(req: Request, res: Response) {
  const row = await svc.updateDiversity(req.user!.orgId, (req.params['id'] as string), req.body as DiversityUpdateBody);
  return row ? ok(res, row) : notFound(res, 'Employee');
}

export async function getDiversityOverview(req: Request, res: Response) {
  const data = await svc.getDiversityOverview(req.user!.orgId);
  return ok(res, data);
}
