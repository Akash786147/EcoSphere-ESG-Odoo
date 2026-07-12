import { Router } from 'express';
import { z } from 'zod';
import { rbac } from '../../../common/middleware/rbac.js';
import { validate } from '../../../common/middleware/validate.js';
import * as ctrl from './compliance-issues.controller.js';
import { CreateComplianceIssueSchema, UpdateComplianceIssueSchema, ReassignSchema } from './compliance-issues.schema.js';

export const complianceIssueRoutes = Router();

complianceIssueRoutes.get('/', ctrl.list);
complianceIssueRoutes.get('/overdue', ctrl.overdue);
complianceIssueRoutes.get('/:id', ctrl.getOne);
complianceIssueRoutes.post(
  '/',
  rbac('ADMIN', 'ESG_OFFICER', 'AUDITOR'),
  validate(z.object({ body: CreateComplianceIssueSchema })),
  ctrl.create,
);
complianceIssueRoutes.put(
  '/:id',
  rbac('ADMIN', 'ESG_OFFICER', 'AUDITOR'),
  validate(z.object({ body: UpdateComplianceIssueSchema })),
  ctrl.update,
);
complianceIssueRoutes.post(
  '/:id/reassign',
  rbac('ADMIN', 'ESG_OFFICER'),
  validate(z.object({ body: ReassignSchema })),
  ctrl.reassign,
);
complianceIssueRoutes.post('/:id/resolve', rbac('ADMIN', 'ESG_OFFICER', 'AUDITOR'), ctrl.resolve);
complianceIssueRoutes.post('/:id/close', rbac('ADMIN', 'ESG_OFFICER'), ctrl.close);
