import { Request, Response } from 'express';

// Challenges
export async function listChallenges(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function createChallenge(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function joinChallenge(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function submitChallenge(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

// Badges
export async function listBadges(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function createBadge(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

// Rewards
export async function listRewards(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function createReward(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function redeemReward(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

// Leaderboard / Points
export async function getLeaderboard(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function getMyPoints(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function getMyStreak(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
