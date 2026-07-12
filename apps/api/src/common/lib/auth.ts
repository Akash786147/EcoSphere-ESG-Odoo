import { SignJWT, jwtVerify, type JWTPayload as JosePayload } from 'jose';
import { env } from '../config/env.js';

const secret = new TextEncoder().encode(env.JWT_SECRET);

export interface AuthPayload {
  sub: string;
  orgId: string;
  role: string;
  email: string;
  name: string;
}

export async function signToken(payload: AuthPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .sign(secret);
}

export async function verifyToken(token: string): Promise<AuthPayload> {
  const { payload } = await jwtVerify<AuthPayload & JosePayload>(token, secret);
  return {
    sub: payload.sub as string,
    orgId: payload.orgId,
    role: payload.role,
    email: payload.email,
    name: payload.name,
  };
}
