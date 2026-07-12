import Redis from 'ioredis';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

export const redisConnection = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  lazyConnect: true,
});

redisConnection.on('connect', () => logger.info('Redis connected'));
redisConnection.on('ready', () => logger.info('Redis ready'));
redisConnection.on('error', (err) => logger.error({ err }, 'Redis error'));
redisConnection.on('close', () => logger.warn('Redis connection closed'));
