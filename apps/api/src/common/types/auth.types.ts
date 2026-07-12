import type { Role } from './enums.js';

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface AuthPayload {
  sub: string;       // employee id
  orgId: string;
  role: Role;
  email: string;
  name: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenMeta {
  employeeId: string;
  orgId: string;
  issuedAt: number;
}
