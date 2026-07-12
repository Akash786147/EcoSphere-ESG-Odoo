import { Request, Response } from 'express';
import * as svc from './framework-mappings.service.js';
import { created, paginated, ok, notFound } from '../../../common/lib/response.js';
import type { CreateFrameworkMappingBody } from './framework-mappings.schema.js';

export async function list(req: Request, res: Response) {
  const { rows, meta } = await svc.listFrameworkMappings(req.user!.orgId, req);
  return paginated(res, rows, meta);
}

export async function getOne(req: Request, res: Response) {
  const row = await svc.getFrameworkMapping(req.user!.orgId, req.params['id'] as string);
  return row ? ok(res, row) : notFound(res, 'Framework Mapping');
}

export async function create(req: Request, res: Response) {
  const row = await svc.createFrameworkMapping(req.user!.orgId, req.body as CreateFrameworkMappingBody);
  return created(res, row);
}

export async function remove(req: Request, res: Response) {
  const row = await svc.deleteFrameworkMapping(req.user!.orgId, req.params['id'] as string);
  return row ? ok(res, row) : notFound(res, 'Framework Mapping');
}
