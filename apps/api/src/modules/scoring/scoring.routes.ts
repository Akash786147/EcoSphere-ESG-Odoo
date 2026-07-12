import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './scoring.controller.js';
import { registry } from '../../common/lib/openapi.js';

export const scoringRoutes = Router();

scoringRoutes.use(authenticate, requireTenant);

scoringRoutes.get('/scores', ctrl.listDepartmentScores);
scoringRoutes.post('/scores/recalculate', ctrl.triggerRecalculate);
scoringRoutes.get('/rankings', ctrl.getDepartmentRankings);

registry.registerPath({
  method: 'get',
  path: '/api/v1/scoring/scores',
  tags: ['Scoring'],
  summary: 'List department scores',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/scoring/scores/recalculate',
  tags: ['Scoring'],
  summary: 'Trigger recalculation',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/scoring/rankings',
  tags: ['Scoring'],
  summary: 'Get department rankings',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});
