import { Request, Response } from 'express';

export async function listOrganizations(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

export async function getOrganization(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

export async function createOrganization(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

export async function updateOrganization(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

export async function getEsgConfig(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

export async function updateEsgConfig(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
