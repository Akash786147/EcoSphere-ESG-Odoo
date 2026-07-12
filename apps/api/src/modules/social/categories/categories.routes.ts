import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './categories.controller.js';
import { CreateCategorySchema, UpdateCategorySchema } from './categories.schema.js';

export const categoryRoutes = Router();

categoryRoutes.get('/', ctrl.list);
categoryRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateCategorySchema })),
  ctrl.create,
);
categoryRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: UpdateCategorySchema })),
  ctrl.update,
);
categoryRoutes.delete('/:id', rbac('ADMIN'), ctrl.remove);
