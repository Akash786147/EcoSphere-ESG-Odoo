import { Request, Response } from 'express';

export async function uploadFile(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented — file upload stub' });
}

export async function listFiles(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

export async function deleteFile(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
