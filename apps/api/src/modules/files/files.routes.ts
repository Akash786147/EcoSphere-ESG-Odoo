import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './files.controller.js';

export const filesRoutes = Router();

filesRoutes.use(authenticate, requireTenant);

filesRoutes.post('/upload', ctrl.uploadFile);
filesRoutes.get('/', ctrl.listFiles);
filesRoutes.delete('/:id', ctrl.deleteFile);
