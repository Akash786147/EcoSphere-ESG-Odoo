import { Request, Response, NextFunction } from 'express';
import { verifyToken, type AuthPayload } from '../lib/auth.js';
import { logger } from '../config/logger.js';

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid authorization header' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = await verifyToken(token!);
    req.user = payload;
    next();
  } catch (err) {
    logger.warn({ err }, 'Failed token verification');
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
