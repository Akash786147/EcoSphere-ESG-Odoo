import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './csr-activities.controller.js';
import { CreateCsrActivitySchema, UpdateCsrActivitySchema } from './csr-activities.schema.js';

export const csrActivityRoutes = Router();

csrActivityRoutes.get('/', ctrl.list);
csrActivityRoutes.get('/:id', ctrl.getOne);
csrActivityRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER', 'DEPT_HEAD'),
  validate(z.object({ body: CreateCsrActivitySchema })),
  ctrl.create,
);
csrActivityRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER', 'DEPT_HEAD'),
  validate(z.object({ body: UpdateCsrActivitySchema })),
  ctrl.update,
);
csrActivityRoutes.delete('/:id', rbac('ADMIN', 'ESG_OFFICER'), ctrl.remove);
csrActivityRoutes.post('/:id/join', ctrl.join);

csrActivityRoutes.put('/:id', rbac('ADMIN', 'ESG_OFFICER'), validate(z.object({ body: UpdateCsrActivitySchema })), ctrl.update);
