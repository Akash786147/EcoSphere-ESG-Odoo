import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './products.controller.js';
import { CreateProductSchema, UpdateProductSchema } from './products.schema.js';

export const productRoutes = Router();

productRoutes.get('/', ctrl.list);
productRoutes.get('/:id', ctrl.getOne);
productRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateProductSchema })),
  ctrl.create,
);
productRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: UpdateProductSchema })),
  ctrl.update,
);
productRoutes.delete('/:id', rbac('ADMIN', 'ESG_OFFICER'), ctrl.remove);

productRoutes.put('/:id', rbac('ADMIN', 'ESG_OFFICER'), validate(z.object({ body: UpdateProductSchema })), ctrl.update);
