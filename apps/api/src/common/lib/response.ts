import type { Response } from 'express';
import type { PaginatedResponse, PaginationMeta } from '../types/api.types.js';

export function ok<T>(res: Response, data: T, message?: string, status = 200) {
  return res.status(status).json({ data, ...(message ? { message } : {}) });
}

export function created<T>(res: Response, data: T, message?: string) {
  return ok(res, data, message, 201);
}

export function noContent(res: Response) {
  return res.status(204).send();
}

export function paginated<T>(
  res: Response,
  data: T[],
  meta: PaginationMeta,
): Response<PaginatedResponse<T>> {
  return res.json({ data, meta });
}

export function notFound(res: Response, entity = 'Resource') {
  return res.status(404).json({ error: `${entity} not found` });
}

export function forbidden(res: Response, message = 'Forbidden') {
  return res.status(403).json({ error: message });
}

export function conflict(res: Response, message = 'Conflict') {
  return res.status(409).json({ error: message });
}

export function badRequest(res: Response, message: string) {
  return res.status(400).json({ error: message });
}
