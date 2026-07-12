import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './framework-mappings.controller.js';
import { CreateFrameworkMappingSchema } from './framework-mappings.schema.js';

export const frameworkMappingRoutes = Router();

frameworkMappingRoutes.get('/', ctrl.list);
frameworkMappingRoutes.get('/:id', ctrl.getOne);
frameworkMappingRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateFrameworkMappingSchema })),
  ctrl.create,
);
frameworkMappingRoutes.delete('/:id', rbac('ADMIN', 'ESG_OFFICER'), ctrl.remove);
