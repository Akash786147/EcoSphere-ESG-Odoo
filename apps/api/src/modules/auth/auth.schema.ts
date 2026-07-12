import { z } from 'zod';
import { registry, ErrorSchema } from '../../common/lib/openapi.js';

// ─── Shared ───────────────────────────────────────────────────────────────────
const TokenPairSchema = registry.register(
  'TokenPair',
  z.object({
    accessToken: z.string().openapi({ example: 'eyJhbGci...' }),
    refreshToken: z.string().openapi({ example: 'eyJhbGci...' }),
  }),
);

const UserMeSchema = registry.register(
  'UserMe',
  z.object({
    id: z.string().uuid(),
    orgId: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
    departmentId: z.string().uuid(),
  }),
);

// ─── Login ────────────────────────────────────────────────────────────────────
export const LoginBodySchema = z.object({
  email: z.string().email().openapi({ example: 'admin@ecosphere.local' }),
  password: z.string().min(1).openapi({ example: 'supersecret' }),
});
export type LoginBody = z.infer<typeof LoginBodySchema>;
registry.register('LoginRequest', LoginBodySchema);

export const LoginResponseSchema = registry.register(
  'LoginResponse',
  z.object({ tokens: TokenPairSchema, user: UserMeSchema }),
);

// ─── Signup ───────────────────────────────────────────────────────────────────
export const SignupBodySchema = z.object({
  orgName: z.string().min(2).openapi({ example: 'Acme Corp' }),
  name: z.string().min(2).openapi({ example: 'John Doe' }),
  email: z.string().email().openapi({ example: 'john@acme.com' }),
  password: z.string().min(8).openapi({ example: 'Str0ngP@ss!' }),
  industry: z.string().optional(),
  country: z.string().length(2).optional().openapi({ example: 'IN' }),
  timezone: z.string().optional().openapi({ example: 'Asia/Kolkata' }),
});
export type SignupBody = z.infer<typeof SignupBodySchema>;
registry.register('SignupRequest', SignupBodySchema);

// ─── Refresh ─────────────────────────────────────────────────────────────────
export const RefreshBodySchema = z.object({
  refreshToken: z.string().min(1).openapi({ example: 'eyJhbGci...' }),
});
export type RefreshBody = z.infer<typeof RefreshBodySchema>;

// ─── Reset password ───────────────────────────────────────────────────────────
export const ForgotPasswordBodySchema = z.object({
  email: z.string().email(),
});
export type ForgotPasswordBody = z.infer<typeof ForgotPasswordBodySchema>;

export const ResetPasswordBodySchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
});
export type ResetPasswordBody = z.infer<typeof ResetPasswordBodySchema>;

// ─── OpenAPI Paths ─────────────────────────────────────────────────────────────

registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/login',
  tags: ['Auth'],
  summary: 'Login to existing account',
  request: {
    body: {
      content: { 'application/json': { schema: LoginBodySchema } },
    },
  },
  responses: {
    200: { description: 'Successful login', content: { 'application/json': { schema: LoginResponseSchema } } },
    401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/signup',
  tags: ['Auth'],
  summary: 'Register new organization and admin',
  request: {
    body: {
      content: { 'application/json': { schema: SignupBodySchema } },
    },
  },
  responses: {
    201: { description: 'Successfully registered', content: { 'application/json': { schema: LoginResponseSchema } } },
    400: { description: 'Validation error', content: { 'application/json': { schema: ErrorSchema } } },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/refresh',
  tags: ['Auth'],
  summary: 'Refresh access token',
  request: {
    body: {
      content: { 'application/json': { schema: RefreshBodySchema } },
    },
  },
  responses: {
    200: { description: 'New token pair', content: { 'application/json': { schema: TokenPairSchema } } },
    401: { description: 'Invalid refresh token', content: { 'application/json': { schema: ErrorSchema } } },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/auth/logout',
  tags: ['Auth'],
  summary: 'Logout and revoke refresh token',
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: RefreshBodySchema } },
    },
  },
  responses: {
    204: { description: 'Successfully logged out' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/auth/me',
  tags: ['Auth'],
  summary: 'Get current user profile',
  security: [{ BearerAuth: [] }],
  responses: {
    200: { description: 'User profile', content: { 'application/json': { schema: UserMeSchema } } },
    401: { description: 'Unauthorized', content: { 'application/json': { schema: ErrorSchema } } },
  },
});
