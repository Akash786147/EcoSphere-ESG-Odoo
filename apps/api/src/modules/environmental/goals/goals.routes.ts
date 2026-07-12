import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './goals.controller.js';
import { CreateGoalSchema, UpdateGoalSchema } from './goals.schema.js';

export const goalRoutes = Router();

goalRoutes.get('/', ctrl.list);
goalRoutes.get('/:id', ctrl.getOne);
goalRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateGoalSchema })),
  ctrl.create,
);
goalRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: UpdateGoalSchema })),
  ctrl.update,
);
goalRoutes.delete('/:id', rbac('ADMIN', 'ESG_OFFICER'), ctrl.remove);
goalRoutes.get('/:id/forecast', ctrl.forecast);
