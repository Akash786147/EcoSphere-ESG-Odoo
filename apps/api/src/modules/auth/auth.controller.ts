import { Request, Response } from 'express';

export async function login(req: Request, res: Response) {
  // TODO: implement actual login against DB
  res.status(501).json({ error: 'Not Implemented' });
}

export async function refresh(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
