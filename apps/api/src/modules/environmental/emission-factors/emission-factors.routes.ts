import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './emission-factors.controller.js';
import { CreateEmissionFactorSchema, UpdateEmissionFactorSchema } from './emission-factors.schema.js';

export const emissionFactorRoutes = Router();

emissionFactorRoutes.get('/', ctrl.list);
emissionFactorRoutes.get('/:id', ctrl.getOne);
emissionFactorRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreateEmissionFactorSchema })),
  ctrl.create,
);
emissionFactorRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: UpdateEmissionFactorSchema })),
  ctrl.update,
);
emissionFactorRoutes.delete('/:id', rbac('ADMIN', 'ESG_OFFICER'), ctrl.remove);

emissionFactorRoutes.put('/:id', rbac('ADMIN', 'ESG_OFFICER'), validate(z.object({ body: UpdateEmissionFactorSchema })), ctrl.update);
