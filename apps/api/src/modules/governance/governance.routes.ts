import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/rbac.js';

import { policyRoutes } from './policies/policies.routes.js';
import { auditRoutes } from './audits/audits.routes.js';
import { complianceIssueRoutes } from './compliance-issues/compliance-issues.routes.js';
import { frameworkMappingRoutes } from './framework-mappings/framework-mappings.routes.js';

export const governanceRoutes = Router();

// Apply auth and tenant validation to all governance routes
governanceRoutes.use(authenticate, requireTenant);

// Mount sub-routers
governanceRoutes.use('/policies', policyRoutes);
governanceRoutes.use('/audits', auditRoutes);
governanceRoutes.use('/compliance-issues', complianceIssueRoutes);
governanceRoutes.use('/framework-mappings', frameworkMappingRoutes);
