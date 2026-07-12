import { Request, Response } from 'express';

// CSR Activities
export async function listCsrActivities(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function createCsrActivity(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function updateCsrActivity(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

// Participations
export async function listParticipations(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function createParticipation(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function approveParticipation(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function rejectParticipation(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

// Trainings
export async function listTrainings(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function createTraining(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function enrollTraining(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function updateTrainingProgress(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
