import { Request, Response } from 'express';

export async function listDepartmentScores(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

export async function triggerRecalculate(req: Request, res: Response) {
  // TODO: enqueue scoring queue job
  res.status(501).json({ error: 'Not Implemented' });
}

export async function getDepartmentRankings(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
