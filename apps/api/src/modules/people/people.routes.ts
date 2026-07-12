import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './people.controller.js';

export const peopleRoutes = Router();

peopleRoutes.use(authenticate, requireTenant);

// Departments
peopleRoutes.get('/departments', ctrl.listDepartments);
peopleRoutes.get('/departments/:id', ctrl.getDepartment);
peopleRoutes.post('/departments', ctrl.createDepartment);
peopleRoutes.put('/departments/:id', ctrl.updateDepartment);

// Employees
peopleRoutes.get('/employees', ctrl.listEmployees);
peopleRoutes.get('/employees/:id', ctrl.getEmployee);
peopleRoutes.post('/employees', ctrl.createEmployee);
peopleRoutes.put('/employees/:id', ctrl.updateEmployee);
