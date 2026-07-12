import { Request, Response, NextFunction } from 'express';

/**
 * Ensures req.user is set (must run after authenticate) and extracts orgId.
 * Some routes might strictly require orgId to be present in params as well,
 * but for basic multi-tenancy we just need to ensure the user belongs to an org.
 */
export function requireTenant(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || !req.user.orgId) {
    res.status(403).json({ error: 'Tenant context required' });
    return;
  }
  next();
}
