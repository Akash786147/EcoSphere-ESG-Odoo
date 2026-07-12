import { z } from 'zod';
import { registry } from '../../common/lib/openapi.js';

export const LoginRequestSchema = registry.register(
  'LoginRequest',
  z.object({
    email: z.string().email().openapi({ example: 'admin@ecosphere.local' }),
    password: z.string().min(8).openapi({ example: 'supersecret' }),
  })
);

export const LoginResponseSchema = registry.register(
  'LoginResponse',
  z.object({
    token: z.string().openapi({ example: 'eyJhbGci...' }),
    user: z.object({
      id: z.string().uuid(),
      orgId: z.string().uuid(),
      name: z.string(),
      email: z.string(),
      role: z.string(),
    }),
  })
);
