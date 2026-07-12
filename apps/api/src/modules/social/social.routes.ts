import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/rbac.js';

import { categoryRoutes } from './categories/categories.routes.js';
import { csrActivityRoutes } from './csr-activities/csr-activities.routes.js';
import { participationRoutes } from './participations/participations.routes.js';
import { trainingRoutes } from './trainings/trainings.routes.js';

export const socialRoutes = Router();

// Apply auth and tenant validation to all social routes
socialRoutes.use(authenticate, requireTenant);

// Mount sub-routers
socialRoutes.use('/categories', categoryRoutes);
socialRoutes.use('/csr-activities', csrActivityRoutes);
socialRoutes.use('/participations', participationRoutes);
socialRoutes.use('/trainings', trainingRoutes);
