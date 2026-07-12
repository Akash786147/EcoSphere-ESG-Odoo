import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './policies.controller.js';
import { CreatePolicySchema, UpdatePolicySchema } from './policies.schema.js';

export const policyRoutes = Router();

policyRoutes.get('/', ctrl.list);
policyRoutes.get('/:id', ctrl.getOne);
policyRoutes.get('/:id/acknowledgement-status', rbac('ADMIN', 'ESG_OFFICER', 'AUDITOR'), ctrl.ackStatus);
policyRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: CreatePolicySchema })),
  ctrl.create,
);
policyRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: UpdatePolicySchema })),
  ctrl.update,
);
policyRoutes.post('/:id/publish', rbac('ADMIN', 'ESG_OFFICER'), ctrl.publish);
policyRoutes.post('/:id/retire', rbac('ADMIN', 'ESG_OFFICER'), ctrl.retire);
policyRoutes.post('/:id/acknowledge', ctrl.acknowledge);
