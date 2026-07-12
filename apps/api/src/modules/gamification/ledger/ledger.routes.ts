import { Router } from 'express';
import * as ctrl from './ledger.controller.js';

export const ledgerRoutes = Router();

ledgerRoutes.get('/history', ctrl.getLedger);
ledgerRoutes.get('/balance', ctrl.getBalance);
ledgerRoutes.get('/leaderboard', ctrl.getLeaderboard);
ledgerRoutes.get('/rank', ctrl.getRank);
ledgerRoutes.get('/streak', ctrl.getMyStreak);
