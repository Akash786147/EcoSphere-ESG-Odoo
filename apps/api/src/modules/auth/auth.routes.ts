import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../common/middleware/validate.js';
import { authenticate } from '../../common/middleware/authenticate.js';
import { authLimiter } from '../../common/middleware/rate-limit.js';
import * as ctrl from './auth.controller.js';
import {
  LoginBodySchema,
  SignupBodySchema,
  RefreshBodySchema,
} from './auth.schema.js';

export const authRoutes = Router();

// Public — auth limiter applies
authRoutes.post('/signup', authLimiter, validate(z.object({ body: SignupBodySchema })), ctrl.signup);
authRoutes.post('/login', authLimiter, validate(z.object({ body: LoginBodySchema })), ctrl.login);
authRoutes.post('/refresh', validate(z.object({ body: RefreshBodySchema })), ctrl.refreshToken);
authRoutes.post('/logout', validate(z.object({ body: RefreshBodySchema })), ctrl.logout);

// Protected
authRoutes.get('/me', authenticate, ctrl.me);
