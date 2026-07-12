import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './social.controller.js';

export const socialRoutes = Router();

socialRoutes.use(authenticate, requireTenant);

// CSR Activities
socialRoutes.get('/csr-activities', ctrl.listCsrActivities);
socialRoutes.post('/csr-activities', ctrl.createCsrActivity);
socialRoutes.put('/csr-activities/:id', ctrl.updateCsrActivity);

// Participations
socialRoutes.get('/participations', ctrl.listParticipations);
socialRoutes.post('/participations', ctrl.createParticipation);
socialRoutes.post('/participations/:id/approve', ctrl.approveParticipation);
socialRoutes.post('/participations/:id/reject', ctrl.rejectParticipation);

// Trainings
socialRoutes.get('/trainings', ctrl.listTrainings);
socialRoutes.post('/trainings', ctrl.createTraining);
socialRoutes.post('/trainings/:id/enroll', ctrl.enrollTraining);
socialRoutes.patch('/trainings/:id/progress', ctrl.updateTrainingProgress);
