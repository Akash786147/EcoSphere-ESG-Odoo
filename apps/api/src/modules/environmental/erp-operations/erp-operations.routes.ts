import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './erp-operations.controller.js';
import { CreateErpOperationSchema } from './erp-operations.schema.js';

export const erpOperationRoutes = Router();

erpOperationRoutes.get('/', ctrl.list);
erpOperationRoutes.get('/:id', ctrl.getOne);
erpOperationRoutes.post(
  '/',
  validate(z.object({ body: CreateErpOperationSchema })),
  ctrl.create,
);
