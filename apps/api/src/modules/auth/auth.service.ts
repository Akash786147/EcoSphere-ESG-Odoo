import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../../common/db/db.js';
import { employees, organizations } from '../../common/db/schema/index.js';
import {
  signTokenPair,
  signAccessToken,
  verifyRefreshToken,
} from '../../common/lib/auth.js';
import type { AuthPayload, TokenPair } from '../../common/types/auth.types.js';
import type { SignupBody, LoginBody } from './auth.schema.js';

export interface AuthUser {
  id: string;
  orgId: string;
  name: string;
  email: string;
  role: string;
  departmentId: string;
}

// ─── Signup ───────────────────────────────────────────────────────────────────
export async function signup(body: SignupBody): Promise<{ tokens: TokenPair; user: AuthUser }> {
  // 1. Create organization
  const [org] = await db
    .insert(organizations)
    .values({
      name: body.orgName,
      industry: body.industry,
      country: body.country,
      timezone: body.timezone,
    })
    .returning();

  if (!org) throw new Error('Failed to create organization');

  // 2. Create a default department for the org
  const { departments } = await import('../../common/db/schema/people.js');
  const [dept] = await db
    .insert(departments)
    .values({
      organizationId: org.id,
      name: 'General',
      code: 'GEN',
    })
    .returning();

  if (!dept) throw new Error('Failed to create default department');

  // 3. Hash password
  const passwordHash = await bcrypt.hash(body.password, 12);

  // 4. Create admin employee
  const [employee] = await db
    .insert(employees)
    .values({
      organizationId: org.id,
      name: body.name,
      email: body.email,
      passwordHash,
      departmentId: dept.id,
      role: 'ADMIN',
      joinDate: new Date().toISOString().split('T')[0] as string,
    })
    .returning();

  if (!employee) throw new Error('Failed to create employee');

  const payload: AuthPayload = {
    sub: employee.id,
    orgId: org.id,
    role: employee.role as AuthPayload['role'],
    email: employee.email,
    name: employee.name,
  };

  const tokens = await signTokenPair(payload);
  return {
    tokens,
    user: {
      id: employee.id,
      orgId: org.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      departmentId: employee.departmentId,
    },
  };
}

// ─── Login ────────────────────────────────────────────────────────────────────
export async function login(body: LoginBody): Promise<{ tokens: TokenPair; user: AuthUser }> {
  const [employee] = await db
    .select()
    .from(employees)
    .where(eq(employees.email, body.email))
    .limit(1);

  if (!employee) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const valid = await bcrypt.compare(body.password, employee.passwordHash);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  if (employee.status !== 'ACTIVE') {
    throw Object.assign(new Error('Account is not active'), { status: 403 });
  }

  const payload: AuthPayload = {
    sub: employee.id,
    orgId: employee.organizationId,
    role: employee.role as AuthPayload['role'],
    email: employee.email,
    name: employee.name,
  };

  const tokens = await signTokenPair(payload);
  return {
    tokens,
    user: {
      id: employee.id,
      orgId: employee.organizationId,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      departmentId: employee.departmentId,
    },
  };
}

// ─── Refresh ──────────────────────────────────────────────────────────────────
export async function refresh(refreshToken: string): Promise<{ accessToken: string }> {
  const meta = await verifyRefreshToken(refreshToken);

  const [employee] = await db
    .select()
    .from(employees)
    .where(eq(employees.id, meta.employeeId))
    .limit(1);

  if (!employee || employee.status !== 'ACTIVE') {
    throw Object.assign(new Error('Employee not found or inactive'), { status: 401 });
  }

  const payload: AuthPayload = {
    sub: employee.id,
    orgId: employee.organizationId,
    role: employee.role as AuthPayload['role'],
    email: employee.email,
    name: employee.name,
  };

  const accessToken = await signAccessToken(payload);
  return { accessToken };
}

// ─── Me ───────────────────────────────────────────────────────────────────────
export async function getMe(employeeId: string): Promise<AuthUser> {
  const [employee] = await db
    .select()
    .from(employees)
    .where(eq(employees.id, employeeId))
    .limit(1);

  if (!employee) throw Object.assign(new Error('Employee not found'), { status: 404 });

  return {
    id: employee.id,
    orgId: employee.organizationId,
    name: employee.name,
    email: employee.email,
    role: employee.role,
    departmentId: employee.departmentId,
  };
}
