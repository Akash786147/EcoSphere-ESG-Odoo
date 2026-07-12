import { Request, Response } from 'express';

export async function listSnapshots(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

export async function listKpiMetrics(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
