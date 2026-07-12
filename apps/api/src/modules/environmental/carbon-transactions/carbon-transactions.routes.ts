import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './carbon-transactions.controller.js';
import { CreateCarbonTransactionSchema } from './carbon-transactions.schema.js';

export const carbonTransactionRoutes = Router();

carbonTransactionRoutes.get('/', ctrl.list);
carbonTransactionRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateCarbonTransactionSchema })),
  ctrl.create,
);
carbonTransactionRoutes.get('/summary', ctrl.getSummary);
