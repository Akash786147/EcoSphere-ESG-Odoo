import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../config/env.js';
import { redisConnection } from './redis.js';
import type { AuthPayload, TokenPair, RefreshTokenMeta } from '../types/auth.types.js';

const accessSecret = new TextEncoder().encode(env.JWT_SECRET);
const refreshSecret = new TextEncoder().encode(env.JWT_SECRET + '_refresh');

const ACCESS_TOKEN_TTL = '15m';
const REFRESH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
const REFRESH_TOKEN_PREFIX = 'rt:';

// ─── Sign ─────────────────────────────────────────────────────────────────────

export async function signAccessToken(payload: AuthPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(uuidv4())
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_TTL)
    .sign(accessSecret);
}

export async function signRefreshToken(payload: AuthPayload): Promise<string> {
  const jti = uuidv4();

  const token = await new SignJWT({ sub: payload.sub, orgId: payload.orgId })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(jti)
    .setIssuedAt()
    .setExpirationTime(`${REFRESH_TOKEN_TTL_SECONDS}s`)
    .sign(refreshSecret);

  const meta: RefreshTokenMeta = {
    employeeId: payload.sub,
    orgId: payload.orgId,
    issuedAt: Date.now(),
  };

  await redisConnection.set(
    `${REFRESH_TOKEN_PREFIX}${jti}`,
    JSON.stringify(meta),
    'EX',
    REFRESH_TOKEN_TTL_SECONDS,
  );

  return token;
}

export async function signTokenPair(payload: AuthPayload): Promise<TokenPair> {
  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken(payload),
    signRefreshToken(payload),
  ]);
  return { accessToken, refreshToken };
}

// ─── Verify ───────────────────────────────────────────────────────────────────

export async function verifyAccessToken(token: string): Promise<AuthPayload> {
  const { payload } = await jwtVerify<AuthPayload & JWTPayload>(token, accessSecret);
  return {
    sub: payload.sub as string,
    orgId: payload.orgId,
    role: payload.role,
    email: payload.email,
    name: payload.name,
  };
}

/**
 * Verifies the refresh token signature, checks it exists in Redis (not revoked),
 * and returns the stored metadata.
 */
export async function verifyRefreshToken(token: string): Promise<RefreshTokenMeta> {
  const { payload } = await jwtVerify<{ sub: string; orgId: string } & JWTPayload>(
    token,
    refreshSecret,
  );

  const jti = payload.jti;
  if (!jti) throw new Error('Invalid refresh token: missing jti');

  const raw = await redisConnection.get(`${REFRESH_TOKEN_PREFIX}${jti}`);
  if (!raw) throw new Error('Refresh token revoked or expired');

  return JSON.parse(raw) as RefreshTokenMeta;
}

/**
 * Revoke a refresh token by deleting its Redis entry (logout / token rotation).
 */
export async function revokeRefreshToken(token: string): Promise<void> {
  try {
    const { payload } = await jwtVerify<JWTPayload>(token, refreshSecret);
    if (payload.jti) {
      await redisConnection.del(`${REFRESH_TOKEN_PREFIX}${payload.jti}`);
    }
  } catch {
    // silently ignore if token is already invalid
  }
}
