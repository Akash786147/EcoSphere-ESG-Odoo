import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './notifications.controller.js';
import { registry } from '../../common/lib/openapi.js';

export const notificationsRoutes = Router();

notificationsRoutes.use(authenticate, requireTenant);

notificationsRoutes.get('/', ctrl.listNotifications);
notificationsRoutes.patch('/:id/read', ctrl.markRead);
notificationsRoutes.patch('/read-all', ctrl.markAllRead);

registry.registerPath({
  method: 'get',
  path: '/api/v1/notifications',
  tags: ['Notifications'],
  summary: 'List notifications',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'patch',
  path: '/api/v1/notifications/{id}/read',
  tags: ['Notifications'],
  summary: 'Mark notification as read',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});

registry.registerPath({
  method: 'patch',
  path: '/api/v1/notifications/read-all',
  tags: ['Notifications'],
  summary: 'Mark all notifications as read',
  security: [{ BearerAuth: [] }],
  responses: { 200: { description: 'Success' } },
});
