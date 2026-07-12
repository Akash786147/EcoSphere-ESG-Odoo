import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './environmental.controller.js';

export const environmentalRoutes = Router();

environmentalRoutes.use(authenticate, requireTenant);

// Emission Factors
environmentalRoutes.get('/emission-factors', ctrl.listEmissionFactors);
environmentalRoutes.post('/emission-factors', ctrl.createEmissionFactor);
environmentalRoutes.put('/emission-factors/:id', ctrl.updateEmissionFactor);

// ERP Operations
environmentalRoutes.get('/operations', ctrl.listOperations);
environmentalRoutes.post('/operations', ctrl.createOperation);
environmentalRoutes.post('/operations/import-csv', ctrl.importOperationsCsv);

// Carbon Transactions
environmentalRoutes.get('/carbon-transactions', ctrl.listCarbonTransactions);

// Products ESG
environmentalRoutes.get('/products', ctrl.listProducts);
environmentalRoutes.post('/products', ctrl.createProduct);

// Vendors
environmentalRoutes.get('/vendors', ctrl.listVendors);
environmentalRoutes.post('/vendors', ctrl.createVendor);

// Environmental Goals
environmentalRoutes.get('/goals', ctrl.listGoals);
environmentalRoutes.post('/goals', ctrl.createGoal);
environmentalRoutes.get('/goals/:id/forecasts', ctrl.getGoalForecasts);
