import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './audits.controller.js';
import { CreateAuditSchema, UpdateAuditSchema } from './audits.schema.js';

export const auditRoutes = Router();

auditRoutes.get('/', ctrl.list);
auditRoutes.get('/:id', ctrl.getOne);
auditRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER', 'AUDITOR'),
  validate(z.object({ body: CreateAuditSchema })),
  ctrl.create,
);
auditRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER', 'AUDITOR'),
  validate(z.object({ body: UpdateAuditSchema })),
  ctrl.update,
);
auditRoutes.post('/:id/complete', rbac('ADMIN', 'ESG_OFFICER', 'AUDITOR'), ctrl.complete);
