import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './trainings.controller.js';
import { CreateTrainingSchema, UpdateTrainingSchema, UpdateProgressSchema } from './trainings.schema.js';

export const trainingRoutes = Router();

trainingRoutes.get('/', ctrl.list);
trainingRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateTrainingSchema })),
  ctrl.create,
);
trainingRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: UpdateTrainingSchema })),
  ctrl.update,
);
trainingRoutes.post('/:id/enroll', ctrl.enroll);
trainingRoutes.patch(
  '/:id/progress',
  validate(z.object({ body: UpdateProgressSchema })),
  ctrl.updateProgress,
);
