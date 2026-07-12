import { pgTable, uuid, varchar, text, date, boolean, timestamp } from 'drizzle-orm/pg-core';
import { organizations } from './platform.js';
import { departments, employees } from './people.js';
import { vendors } from './environmental.js';

export const esgPolicies = pgTable('esg_policies', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  version: varchar('version', { length: 50 }).notNull(),
  effectiveDate: date('effective_date').notNull(),
  ackDeadline: date('ack_deadline'),
  ackRequired: boolean('ack_required').notNull().default(true),
  status: varchar('status', { length: 50 }).notNull().default('ACTIVE'),
});

export const policyAcknowledgements = pgTable('policy_acknowledgements', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  policyId: uuid('policy_id').notNull().references(() => esgPolicies.id),
  employeeId: uuid('employee_id').notNull().references(() => employees.id),
  acknowledgedAt: timestamp('acknowledged_at').notNull().defaultNow(),
  policyVersionAtAck: varchar('policy_version_at_ack', { length: 50 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('ACKNOWLEDGED'),
});

export const audits = pgTable('audits', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  title: varchar('title', { length: 255 }).notNull(),
  auditType: varchar('audit_type', { length: 50 }).notNull(), 
  departmentId: uuid('department_id').notNull().references(() => departments.id),
  vendorId: uuid('vendor_id').references(() => vendors.id),
  auditorId: uuid('auditor_id').notNull().references(() => employees.id),
  auditDate: date('audit_date').notNull(),
  findingsSummary: text('findings_summary'),
  status: varchar('status', { length: 50 }).notNull().default('PLANNED'),
});

export const complianceIssues = pgTable('compliance_issues', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  auditId: uuid('audit_id').notNull().references(() => audits.id),
  severity: varchar('severity', { length: 50 }).notNull(), 
  description: text('description').notNull(),
  ownerId: uuid('owner_id').notNull().references(() => employees.id),
  dueDate: date('due_date').notNull(),
  overdueFlagged: boolean('overdue_flagged').notNull().default(false),
  status: varchar('status', { length: 50 }).notNull().default('OPEN'),
});

export const frameworkMappings = pgTable('framework_mappings', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  framework: varchar('framework', { length: 50 }).notNull(), 
  frameworkCode: varchar('framework_code', { length: 100 }).notNull(),
  module: varchar('module', { length: 50 }).notNull(),
  internalMetric: varchar('internal_metric', { length: 100 }).notNull(),
});
