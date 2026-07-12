import { Request, Response } from 'express';

// Emission Factors
export async function listEmissionFactors(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function createEmissionFactor(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function updateEmissionFactor(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

// ERP Operations
export async function listOperations(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function createOperation(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function importOperationsCsv(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented — CSV import stub' });
}

// Carbon Transactions
export async function listCarbonTransactions(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

// Products ESG
export async function listProducts(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function createProduct(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

// Vendors
export async function listVendors(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function createVendor(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}

// Environmental Goals
export async function listGoals(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function createGoal(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
export async function getGoalForecasts(req: Request, res: Response) {
  res.status(501).json({ error: 'Not Implemented' });
}
