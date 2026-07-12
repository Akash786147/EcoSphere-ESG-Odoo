import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/rbac.js';

import { departmentRoutes } from './departments/departments.routes.js';
import { employeeRoutes } from './employees/employees.routes.js';

export const peopleRoutes = Router();

// Apply auth and tenant validation to all people routes
peopleRoutes.use(authenticate, requireTenant);

// Mount sub-routers
peopleRoutes.use('/departments', departmentRoutes);
peopleRoutes.use('/employees', employeeRoutes);
