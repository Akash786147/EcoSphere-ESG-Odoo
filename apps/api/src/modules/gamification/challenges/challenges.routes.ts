import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './challenges.controller.js';
import { CreateChallengeSchema, UpdateChallengeSchema, UpdateProgressSchema } from './challenges.schema.js';

export const challengeRoutes = Router();

challengeRoutes.get('/', ctrl.list);
challengeRoutes.get('/:id', ctrl.getOne);
challengeRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateChallengeSchema })),
  ctrl.create,
);
challengeRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: UpdateChallengeSchema })),
  ctrl.update,
);
challengeRoutes.post('/:id/transition', rbac('ADMIN', 'ESG_OFFICER'), ctrl.transition);
challengeRoutes.post('/:id/join', ctrl.join);
challengeRoutes.patch(
  '/participations/:id/progress',
  validate(z.object({ body: UpdateProgressSchema })),
  ctrl.updateProgress,
);
challengeRoutes.post('/participations/:id/approve', rbac('ADMIN', 'ESG_OFFICER', 'DEPT_HEAD'), ctrl.approve);
challengeRoutes.post('/participations/:id/reject', rbac('ADMIN', 'ESG_OFFICER', 'DEPT_HEAD'), ctrl.reject);
