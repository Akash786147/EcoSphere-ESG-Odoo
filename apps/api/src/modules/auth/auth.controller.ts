import { Request, Response } from 'express';
import * as authService from './auth.service.js';
import { revokeRefreshToken } from '../../common/lib/auth.js';
import { ok, created } from '../../common/lib/response.js';
import type {
  LoginBody,
  SignupBody,
  RefreshBody,
} from './auth.schema.js';

export async function signup(req: Request, res: Response) {
  const result = await authService.signup(req.body as SignupBody);
  return created(res, result, 'Organization and admin account created');
}

export async function login(req: Request, res: Response) {
  const result = await authService.login(req.body as LoginBody);
  return ok(res, result);
}

export async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body as RefreshBody;
  const result = await authService.refresh(refreshToken);
  return ok(res, result);
}

export async function logout(req: Request, res: Response) {
  const { refreshToken } = req.body as RefreshBody;
  if (refreshToken) await revokeRefreshToken(refreshToken);
  return ok(res, null, 'Logged out successfully');
}

export async function me(req: Request, res: Response) {
  const user = await authService.getMe(req.user!.sub);
  return ok(res, user);
}
