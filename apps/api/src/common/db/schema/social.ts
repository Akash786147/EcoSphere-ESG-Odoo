import { pgTable, uuid, varchar, text, date, integer, boolean, timestamp, decimal } from 'drizzle-orm/pg-core';
import { organizations } from './platform.js';
import { employees } from './people.js';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), 
  status: varchar('status', { length: 50 }).notNull().default('ACTIVE'),
});

export const csrActivities = pgTable('csr_activities', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  title: varchar('title', { length: 255 }).notNull(),
  categoryId: uuid('category_id').notNull().references(() => categories.id),
  description: text('description').notNull(),
  activityDate: date('activity_date').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  pointsOnCompletion: integer('points_on_completion').notNull(),
  evidenceRequired: boolean('evidence_required').notNull().default(true),
  organizerId: uuid('organizer_id').notNull().references(() => employees.id),
  status: varchar('status', { length: 50 }).notNull().default('PLANNED'),
});

export const employeeParticipations = pgTable('employee_participations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  employeeId: uuid('employee_id').notNull().references(() => employees.id),
  csrActivityId: uuid('csr_activity_id').notNull().references(() => csrActivities.id),
  approvalStatus: varchar('approval_status', { length: 50 }).notNull().default('PENDING'), 
  approvedBy: uuid('approved_by').references(() => employees.id),
  pointsEarned: integer('points_earned'),
  completionDate: date('completion_date'),
});

export const trainings = pgTable('trainings', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  categoryId: uuid('category_id').notNull().references(() => categories.id),
  trainingType: varchar('training_type', { length: 50 }).notNull(), 
  durationMinutes: integer('duration_minutes').notNull(),
  xpReward: integer('xp_reward').notNull(),
  contentUrl: varchar('content_url', { length: 500 }).notNull(),
  validFrom: date('valid_from').notNull(),
  validTo: date('valid_to'),
  status: varchar('status', { length: 50 }).notNull().default('PUBLISHED'),
});

export const trainingCompletions = pgTable('training_completions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  trainingId: uuid('training_id').notNull().references(() => trainings.id),
  employeeId: uuid('employee_id').notNull().references(() => employees.id),
  status: varchar('status', { length: 50 }).notNull().default('ENROLLED'), 
  progressPct: integer('progress_pct').notNull().default(0),
  scorePct: decimal('score_pct'),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  expiresAt: date('expires_at'),
  xpAwarded: integer('xp_awarded'),
});
