import { z } from 'zod';
import { registry } from '../../common/lib/openapi.js';

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
  refreshToken: z.string().min(1),
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
