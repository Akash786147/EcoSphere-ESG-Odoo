import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './scoring.controller.js';

export const scoringRoutes = Router();

scoringRoutes.use(authenticate, requireTenant);

scoringRoutes.get('/scores', ctrl.listDepartmentScores);
scoringRoutes.post('/scores/recalculate', ctrl.triggerRecalculate);
scoringRoutes.get('/rankings', ctrl.getDepartmentRankings);
