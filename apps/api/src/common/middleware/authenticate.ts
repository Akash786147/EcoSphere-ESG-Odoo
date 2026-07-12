import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../lib/auth.js';
import { logger } from '../config/logger.js';
import type { AuthPayload } from '../types/auth.types.js';

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    req.user = await verifyAccessToken(token!);
    next();
  } catch (err) {
    logger.warn({ err }, 'Access token verification failed');
    res.status(401).json({ error: 'Invalid or expired access token' });
  }
}
