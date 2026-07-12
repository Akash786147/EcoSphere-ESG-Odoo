import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';
import { ZodError } from 'zod';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation Error',
      details: err.flatten().fieldErrors,
    });
    return;
  }

  logger.error({ err, path: req.path }, 'Unhandled Request Error');

  const status = (err as any)?.status || 500;
  const message = envIsDev() ? (err as Error)?.message : 'Internal Server Error';

  res.status(status).json({ error: message });
}

function envIsDev() {
  return process.env['NODE_ENV'] !== 'production';
}
