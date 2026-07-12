import { Request, Response } from 'express';
import * as svc from './departments.service.js';
import { ok, created, noContent, notFound, paginated } from '../../../common/lib/response.js';
import type { CreateDepartmentBody, UpdateDepartmentBody } from './departments.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listDepartments(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getDepartment(req.user!.orgId, (req.params['id'] as string));
  return row ? ok(res, row) : notFound(res, 'Department');
}

export async function getEmployees(req: Request, res: Response) {
  const { rows, meta } = await svc.getDepartmentEmployees(req.user!.orgId, (req.params['id'] as string), req);
  return paginated(res, rows, meta);
}

export async function create(req: Request, res: Response) {
  const row = await svc.createDepartment(req.user!.orgId, req.body as CreateDepartmentBody);
  return created(res, row);
}

export async function update(req: Request, res: Response) {
  const row = await svc.updateDepartment(req.user!.orgId, (req.params['id'] as string), req.body as UpdateDepartmentBody);
  return row ? ok(res, row) : notFound(res, 'Department');
}

export async function remove(req: Request, res: Response) {
  const row = await svc.deleteDepartment(req.user!.orgId, (req.params['id'] as string));
  return row ? noContent(res) : notFound(res, 'Department');
}
