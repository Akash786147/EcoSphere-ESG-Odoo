import type { Request } from 'express';
import type { PaginationQuery } from '../types/api.types.js';

export function parsePagination(req: Request): PaginationQuery {
  const page = Math.max(1, parseInt(String(req.query['page'] ?? '1'), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(req.query['limit'] ?? '20'), 10)));
  return { page, limit, offset: (page - 1) * limit };
}

export function buildMeta(page: number, limit: number, total: number) {
  return { page, limit, total, totalPages: Math.ceil(total / limit) };
}
