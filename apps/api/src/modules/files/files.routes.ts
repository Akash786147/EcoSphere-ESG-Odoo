import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './files.controller.js';
import { registry } from '../../common/lib/openapi.js';

export const filesRoutes = Router();

filesRoutes.use(authenticate, requireTenant);

filesRoutes.post('/upload', ctrl.uploadFile);
filesRoutes.get('/', ctrl.listFiles);
filesRoutes.delete('/:id', ctrl.deleteFile);

registry.registerPath({
  method: 'post',
  path: '/api/v1/files/upload',
  tags: ['Files'],
  summary: 'Upload a file',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/files',
  tags: ['Files'],
  summary: 'List files',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'delete',
  path: '/api/v1/files/{id}',
  tags: ['Files'],
  summary: 'Delete a file',
  security: [{ BearerAuth: [] }],
  responses: { 204: { description: 'Success' } },
});
