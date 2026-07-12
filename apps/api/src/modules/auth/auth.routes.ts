import { Router } from 'express';
import { validate } from '../../common/middleware/validate.js';
import { z } from 'zod';
import * as authController from './auth.controller.js';
import { LoginRequestSchema, LoginResponseSchema } from './auth.schema.js';
import { registry, ErrorSchema } from '../../common/lib/openapi.js';

export const authRoutes = Router();

registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/login',
  tags: ['Auth'],
  summary: 'Login to the platform',
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful login',
      content: { 'application/json': { schema: LoginResponseSchema } },
    },
    400: { description: 'Validation Error', content: { 'application/json': { schema: ErrorSchema } } },
    401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
  },
});

authRoutes.post('/login', validate(z.object({ body: LoginRequestSchema })), authController.login);
authRoutes.post('/refresh', authController.refresh);
