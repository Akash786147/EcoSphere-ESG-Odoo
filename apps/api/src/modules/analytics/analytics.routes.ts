import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './analytics.controller.js';
import { registry } from '../../common/lib/openapi.js';

export const analyticsRoutes = Router();

analyticsRoutes.use(authenticate, requireTenant);

analyticsRoutes.get('/snapshots', ctrl.listSnapshots);
analyticsRoutes.get('/kpis', ctrl.listKpiMetrics);

registry.registerPath({
  method: 'get',
  path: '/api/v1/analytics/snapshots',
  tags: ['Analytics'],
  summary: 'List analytics snapshots',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/analytics/kpis',
  tags: ['Analytics'],
  summary: 'List KPI metrics',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});
