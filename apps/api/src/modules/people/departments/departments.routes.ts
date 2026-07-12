import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './departments.controller.js';
import { CreateDepartmentSchema, UpdateDepartmentSchema } from './departments.schema.js';

export const departmentRoutes = Router();

departmentRoutes.get('/', ctrl.list);
departmentRoutes.get('/:id', ctrl.getOne);
departmentRoutes.get('/:id/employees', ctrl.getEmployees);
departmentRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateDepartmentSchema })),
  ctrl.create,
);
departmentRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: UpdateDepartmentSchema })),
  ctrl.update,
);
departmentRoutes.delete('/:id', rbac('ADMIN'), ctrl.remove);
