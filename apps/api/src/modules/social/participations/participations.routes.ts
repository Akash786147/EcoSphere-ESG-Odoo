import { Router } from 'express';
import { rbac } from '../../../common/middleware/rbac.js';
import * as ctrl from './participations.controller.js';

export const participationRoutes = Router();

participationRoutes.get('/', ctrl.list);
participationRoutes.post('/:id/approve', rbac('ADMIN', 'ESG_OFFICER', 'DEPT_HEAD'), ctrl.approve);
participationRoutes.post('/:id/reject', rbac('ADMIN', 'ESG_OFFICER', 'DEPT_HEAD'), ctrl.reject);
