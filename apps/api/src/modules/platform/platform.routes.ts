import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './platform.controller.js';

export const platformRoutes = Router();

platformRoutes.use(authenticate, requireTenant);

platformRoutes.get('/organizations', ctrl.listOrganizations);
platformRoutes.get('/organizations/:id', ctrl.getOrganization);
platformRoutes.post('/organizations', ctrl.createOrganization);
platformRoutes.put('/organizations/:id', ctrl.updateOrganization);
platformRoutes.get('/organizations/:id/esg-config', ctrl.getEsgConfig);
platformRoutes.put('/organizations/:id/esg-config', ctrl.updateEsgConfig);
