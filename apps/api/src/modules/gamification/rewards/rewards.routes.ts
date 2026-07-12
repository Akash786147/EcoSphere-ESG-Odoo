import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './rewards.controller.js';
import { CreateRewardSchema, UpdateRewardSchema } from './rewards.schema.js';

export const rewardRoutes = Router();

rewardRoutes.get('/', ctrl.list);
rewardRoutes.get('/redemptions', rbac('ADMIN', 'ESG_OFFICER'), ctrl.redemptions);
rewardRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateRewardSchema })),
  ctrl.create,
);
rewardRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: UpdateRewardSchema })),
  ctrl.update,
);
rewardRoutes.post('/:id/redeem', ctrl.redeem);
