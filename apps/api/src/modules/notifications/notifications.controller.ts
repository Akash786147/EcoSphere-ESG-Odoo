import { Request, Response } from 'express';

export async function listNotifications(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

export async function markRead(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

export async function markAllRead(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
