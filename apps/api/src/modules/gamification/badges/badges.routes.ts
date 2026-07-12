import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './badges.controller.js';
import { CreateBadgeSchema, UpdateBadgeSchema } from './badges.schema.js';

export const badgeRoutes = Router();

badgeRoutes.get('/', ctrl.list);
badgeRoutes.get('/:id', ctrl.getOne);
badgeRoutes.get('/mine', ctrl.mine);
badgeRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateBadgeSchema })),
  ctrl.create,
);
badgeRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: UpdateBadgeSchema })),
  ctrl.update,
);
badgeRoutes.post('/:id/award', rbac('ADMIN', 'ESG_OFFICER'), ctrl.award);

badgeRoutes.delete('/:id', rbac('ADMIN', 'ESG_OFFICER'), ctrl.remove);

badgeRoutes.put('/:id', rbac('ADMIN', 'ESG_OFFICER'), validate(z.object({ body: UpdateBadgeSchema })), ctrl.update);
