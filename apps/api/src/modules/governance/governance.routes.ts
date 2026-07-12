import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './governance.controller.js';

export const governanceRoutes = Router();

governanceRoutes.use(authenticate, requireTenant);

// Policies
governanceRoutes.get('/policies', ctrl.listPolicies);
governanceRoutes.post('/policies', ctrl.createPolicy);
governanceRoutes.post('/policies/:id/acknowledge', ctrl.acknowledgePolicy);

// Audits
governanceRoutes.get('/audits', ctrl.listAudits);
governanceRoutes.post('/audits', ctrl.createAudit);
governanceRoutes.put('/audits/:id', ctrl.updateAudit);

// Compliance Issues
governanceRoutes.get('/compliance-issues', ctrl.listComplianceIssues);
governanceRoutes.post('/compliance-issues', ctrl.createComplianceIssue);
governanceRoutes.put('/compliance-issues/:id', ctrl.updateComplianceIssue);

// Framework Mappings
governanceRoutes.get('/framework-mappings', ctrl.listFrameworkMappings);
governanceRoutes.post('/framework-mappings', ctrl.createFrameworkMapping);
