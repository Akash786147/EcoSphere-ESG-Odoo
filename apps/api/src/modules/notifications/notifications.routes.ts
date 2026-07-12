import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './notifications.controller.js';

export const notificationsRoutes = Router();

notificationsRoutes.use(authenticate, requireTenant);

notificationsRoutes.get('/', ctrl.listNotifications);
notificationsRoutes.patch('/:id/read', ctrl.markRead);
notificationsRoutes.patch('/read-all', ctrl.markAllRead);
