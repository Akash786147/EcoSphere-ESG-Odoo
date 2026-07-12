import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './analytics.controller.js';

export const analyticsRoutes = Router();

analyticsRoutes.use(authenticate, requireTenant);

analyticsRoutes.get('/snapshots', ctrl.listSnapshots);
analyticsRoutes.get('/kpis', ctrl.listKpiMetrics);
