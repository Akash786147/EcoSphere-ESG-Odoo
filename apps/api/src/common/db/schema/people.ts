import { pgTable, uuid, varchar, timestamp, integer, boolean, date } from 'drizzle-orm/pg-core';
import { organizations } from './platform.js';

export const departments = pgTable('departments', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  name: varchar('name', { length: 255 }).notNull(),
  code: varchar('code', { length: 50 }).notNull(),
  headId: uuid('head_id'), 
  parentDepartmentId: uuid('parent_department_id'), 
  employeeCount: integer('employee_count').notNull().default(0),
  status: varchar('status', { length: 50 }).notNull().default('ACTIVE'),
});

export const employees = pgTable('employees', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  departmentId: uuid('department_id').notNull().references(() => departments.id),
  role: varchar('role', { length: 50 }).notNull().default('EMPLOYEE'), 
  gender: varchar('gender', { length: 50 }),
  ageBand: varchar('age_band', { length: 50 }),
  ethnicity: varchar('ethnicity', { length: 100 }),
  disabilityStatus: boolean('disability_status'),
  nationality: varchar('nationality', { length: 100 }),
  joinDate: date('join_date').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('ACTIVE'),
});
