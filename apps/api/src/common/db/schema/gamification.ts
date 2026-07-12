import { pgTable, uuid, varchar, text, integer, json, boolean, date, timestamp, decimal } from 'drizzle-orm/pg-core';
import { organizations } from './platform.js';
import { departments, employees } from './people.js';
import { categories } from './social.js';

export const challenges = pgTable('challenges', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  title: varchar('title', { length: 255 }).notNull(),
  categoryId: uuid('category_id').notNull().references(() => categories.id),
  description: text('description').notNull(),
  xpReward: integer('xp_reward').notNull(),
  difficulty: varchar('difficulty', { length: 50 }).notNull(), 
  challengeType: varchar('challenge_type', { length: 50 }).notNull(), 
  evidenceRequired: boolean('evidence_required').notNull().default(true),
  deadline: date('deadline').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('DRAFT'),
});

export const challengeParticipations = pgTable('challenge_participations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  challengeId: uuid('challenge_id').notNull().references(() => challenges.id),
  employeeId: uuid('employee_id').notNull().references(() => employees.id),
  departmentId: uuid('department_id').references(() => departments.id),
  progressPct: integer('progress_pct').notNull().default(0),
  approvalStatus: varchar('approval_status', { length: 50 }).notNull().default('PENDING'),
  approvedBy: uuid('approved_by').references(() => employees.id),
  xpAwarded: integer('xp_awarded'),
  completedAt: timestamp('completed_at'),
});

export const badges = pgTable('badges', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  unlockRule: json('unlock_rule').notNull(),
  icon: varchar('icon', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('ACTIVE'),
});

export const employeeBadges = pgTable('employee_badges', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  employeeId: uuid('employee_id').notNull().references(() => employees.id),
  badgeId: uuid('badge_id').notNull().references(() => badges.id),
  awardMode: varchar('award_mode', { length: 50 }).notNull(), 
  awardedAt: timestamp('awarded_at').notNull().defaultNow(),
});

export const rewards = pgTable('rewards', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  pointsRequired: integer('points_required').notNull(),
  stock: integer('stock').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('ACTIVE'),
});

export const rewardRedemptions = pgTable('reward_redemptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  rewardId: uuid('reward_id').notNull().references(() => rewards.id),
  employeeId: uuid('employee_id').notNull().references(() => employees.id),
  pointsSpent: integer('points_spent').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('REQUESTED'), 
  redeemedAt: timestamp('redeemed_at').notNull().defaultNow(),
});

export const pointsLedger = pgTable('points_ledger', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  employeeId: uuid('employee_id').notNull().references(() => employees.id),
  entryType: varchar('entry_type', { length: 50 }).notNull(), 
  points: integer('points').notNull(),
  source: varchar('source', { length: 50 }).notNull(), 
  sourceRefId: uuid('source_ref_id'), 
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const streaks = pgTable('streaks', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  employeeId: uuid('employee_id').notNull().references(() => employees.id),
  currentStreakDays: integer('current_streak_days').notNull().default(0),
  longestStreakDays: integer('longest_streak_days').notNull().default(0),
  xpMultiplier: decimal('xp_multiplier', { precision: 3, scale: 2 }).notNull().default('1.00'),
  lastActivityDate: date('last_activity_date'),
});
