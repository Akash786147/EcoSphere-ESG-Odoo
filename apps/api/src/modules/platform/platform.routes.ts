import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './platform.controller.js';
import { registry } from '../../common/lib/openapi.js';

export const platformRoutes = Router();

platformRoutes.use(authenticate, requireTenant);

platformRoutes.get('/organizations', ctrl.listOrganizations);
platformRoutes.get('/organizations/:id', ctrl.getOrganization);
platformRoutes.post('/organizations', ctrl.createOrganization);
platformRoutes.put('/organizations/:id', ctrl.updateOrganization);
platformRoutes.get('/organizations/:id/esg-config', ctrl.getEsgConfig);
platformRoutes.put('/organizations/:id/esg-config', ctrl.updateEsgConfig);

registry.registerPath({
  method: 'get',
  path: '/api/v1/platform/organizations',
  tags: ['Platform'],
  summary: 'List organizations',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/platform/organizations/{id}',
  tags: ['Platform'],
  summary: 'Get organization',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/platform/organizations',
  tags: ['Platform'],
  summary: 'Create organization',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'put',
  path: '/api/v1/platform/organizations/{id}',
  tags: ['Platform'],
  summary: 'Update organization',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/platform/organizations/{id}/esg-config',
  tags: ['Platform'],
  summary: 'Get ESG Config',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'put',
  path: '/api/v1/platform/organizations/{id}/esg-config',
  tags: ['Platform'],
  summary: 'Update ESG Config',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});
