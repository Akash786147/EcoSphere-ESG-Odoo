import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './vendors.controller.js';
import { CreateVendorSchema, UpdateVendorSchema } from './vendors.schema.js';

export const vendorRoutes = Router();

vendorRoutes.get('/', ctrl.list);
vendorRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateVendorSchema })),
  ctrl.create,
);
vendorRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: UpdateVendorSchema })),
  ctrl.update,
);
vendorRoutes.delete('/:id', rbac('ADMIN', 'ESG_OFFICER'), ctrl.remove);
