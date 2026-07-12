import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './employees.controller.js';
import { CreateEmployeeSchema, UpdateEmployeeSchema, ChangeRoleSchema, DiversityUpdateSchema } from './employees.schema.js';

export const employeeRoutes = Router();

employeeRoutes.get('/', ctrl.list);
employeeRoutes.get('/diversity/overview', ctrl.getDiversityOverview);
employeeRoutes.get('/:id', ctrl.getOne);
employeeRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateEmployeeSchema })),
  ctrl.create,
);
employeeRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: UpdateEmployeeSchema })),
  ctrl.update,
);
employeeRoutes.delete('/:id', rbac('ADMIN'), ctrl.remove);
employeeRoutes.put(
  '/:id/role',
  rbac('ADMIN'),
  validate(z.object({ body: ChangeRoleSchema })),
  ctrl.changeRole,
);
employeeRoutes.put(
  '/:id/diversity',
  validate(z.object({ body: DiversityUpdateSchema })),
  ctrl.updateDiversity,
);
