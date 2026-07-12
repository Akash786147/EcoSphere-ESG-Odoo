import { Router } from 'express';
import { authenticate } from '../../common/middleware/authenticate.js';
import { requireTenant } from '../../common/middleware/tenant.js';
import * as ctrl from './gamification.controller.js';

export const gamificationRoutes = Router();

gamificationRoutes.use(authenticate, requireTenant);

// Challenges
gamificationRoutes.get('/challenges', ctrl.listChallenges);
gamificationRoutes.post('/challenges', ctrl.createChallenge);
gamificationRoutes.post('/challenges/:id/join', ctrl.joinChallenge);
gamificationRoutes.post('/challenges/:id/submit', ctrl.submitChallenge);

// Badges
gamificationRoutes.get('/badges', ctrl.listBadges);
gamificationRoutes.post('/badges', ctrl.createBadge);

// Rewards
gamificationRoutes.get('/rewards', ctrl.listRewards);
gamificationRoutes.post('/rewards', ctrl.createReward);
gamificationRoutes.post('/rewards/:id/redeem', ctrl.redeemReward);

// Leaderboard / Points / Streaks
gamificationRoutes.get('/leaderboard', ctrl.getLeaderboard);
gamificationRoutes.get('/me/points', ctrl.getMyPoints);
gamificationRoutes.get('/me/streak', ctrl.getMyStreak);
