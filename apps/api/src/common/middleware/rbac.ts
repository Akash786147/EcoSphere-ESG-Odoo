import { Request, Response, NextFunction } from 'express';
import type { Role } from '../types/enums.js';

/**
 * Require the authenticated user to have one of the specified roles.
 *
 * Usage:
 *   router.delete('/foo/:id', authenticate, rbac('ADMIN', 'ESG_OFFICER'), ctrl.delete)
 */
export function rbac(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthenticated' });
      return;
    }

    if (!allowedRoles.includes(req.user.role as Role)) {
      res.status(403).json({
        error: 'Forbidden',
        message: `Requires one of: ${allowedRoles.join(', ')}`,
      });
      return;
    }

    next();
  };
}

/**
 * Require any authenticated user (just checks req.user exists).
 * Use after authenticate() to confirm org context.
 */
export function requireTenant(req: Request, res: Response, next: NextFunction): void {
  if (!req.user?.orgId) {
    res.status(403).json({ error: 'Tenant context required' });
    return;
  }
  next();
}
