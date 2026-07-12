import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/rbac.js';

import { challengeRoutes } from './challenges/challenges.routes.js';
import { ledgerRoutes } from './ledger/ledger.routes.js';
import { badgeRoutes } from './badges/badges.routes.js';
import { rewardRoutes } from './rewards/rewards.routes.js';

export const gamificationRoutes = Router();

// Apply auth and tenant validation to all gamification routes
gamificationRoutes.use(authenticate, requireTenant);

// Mount sub-routers
gamificationRoutes.use('/challenges', challengeRoutes);
gamificationRoutes.use('/ledger', ledgerRoutes);
gamificationRoutes.use('/badges', badgeRoutes);
gamificationRoutes.use('/rewards', rewardRoutes);
