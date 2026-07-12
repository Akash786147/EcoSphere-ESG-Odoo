import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/rbac.js';

import { emissionFactorRoutes } from './emission-factors/emission-factors.routes.js';
import { erpOperationRoutes } from './erp-operations/erp-operations.routes.js';
import { carbonTransactionRoutes } from './carbon-transactions/carbon-transactions.routes.js';
import { productRoutes } from './products/products.routes.js';
import { vendorRoutes } from './vendors/vendors.routes.js';
import { goalRoutes } from './goals/goals.routes.js';

export const environmentalRoutes = Router();

// Apply auth and tenant validation to all environmental routes
environmentalRoutes.use(authenticate, requireTenant);

// Mount sub-routers
environmentalRoutes.use('/emission-factors', emissionFactorRoutes);
environmentalRoutes.use('/erp-operations', erpOperationRoutes);
environmentalRoutes.use('/carbon-transactions', carbonTransactionRoutes);
environmentalRoutes.use('/products', productRoutes);
environmentalRoutes.use('/vendors', vendorRoutes);
environmentalRoutes.use('/goals', goalRoutes);
