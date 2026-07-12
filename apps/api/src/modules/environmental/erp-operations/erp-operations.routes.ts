import { rbac } from '../../../common/middleware/rbac.js';
import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './erp-operations.controller.js';
import { CreateErpOperationSchema, UpdateErpOperationSchema } from './erp-operations.schema.js';

export const erpOperationRoutes = Router();

erpOperationRoutes.get('/', ctrl.list);
erpOperationRoutes.get('/:id', ctrl.getOne);
erpOperationRoutes.post(
  '/',
  validate(z.object({ body: CreateErpOperationSchema })),
  ctrl.create,
);

erpOperationRoutes.delete('/:id', rbac('ADMIN', 'ESG_OFFICER'), ctrl.remove);

erpOperationRoutes.put('/:id', rbac('ADMIN', 'ESG_OFFICER'), validate(z.object({ body: UpdateErpOperationSchema })), ctrl.update);
