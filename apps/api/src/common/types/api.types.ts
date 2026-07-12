// ─── Generic API response wrappers ───────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ─── Pagination query (parsed from request query params) ─────────────────────
export interface PaginationQuery {
  page: number;
  limit: number;
  offset: number;
}

// ─── Common filter shapes ──────────────────────────────────────────────────────
export interface DateRangeFilter {
  dateFrom?: string; // ISO date string
  dateTo?: string;
}

export interface SearchFilter {
  search?: string;
}
