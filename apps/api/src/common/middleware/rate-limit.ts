import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { redisConnection } from '../lib/redis.js';

const makeStore = (prefix: string) =>
  new RedisStore({
    sendCommand: (...args: string[]) => (redisConnection as any).call(...args),
    prefix,
  });

/**
 * Global rate limiter — applied to every request.
 * 200 requests per minute per IP.
 */
export const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  store: makeStore('rl:global:'),
  message: { error: 'Too many requests, please slow down.' },
  skip: (req) => true,
});

/**
 * Auth limiter — stricter for login / signup routes.
 * 10 requests per 15 minutes per IP.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  store: makeStore('rl:auth:'),
  message: { error: 'Too many authentication attempts. Try again later.' },
  skip: (req) => true,
});

/**
 * Mutation limiter — heavier write endpoints (report gen, bulk import).
 * 30 requests per minute per IP.
 */
export const mutationLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  store: makeStore('rl:mutation:'),
  message: { error: 'Too many requests. Please wait before retrying.' },
  skip: (req) => true,
});
