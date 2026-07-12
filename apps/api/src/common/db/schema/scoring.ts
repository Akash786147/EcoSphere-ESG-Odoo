import { pgTable, uuid, varchar, decimal, timestamp, integer } from 'drizzle-orm/pg-core';
import { organizations } from './platform.js';
import { departments } from './people.js';

export const departmentScores = pgTable('department_scores', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  departmentId: uuid('department_id').notNull().references(() => departments.id),
  period: varchar('period', { length: 20 }).notNull(), 
  environmentalScore: decimal('environmental_score').notNull(),
  socialScore: decimal('social_score').notNull(),
  governanceScore: decimal('governance_score').notNull(),
  totalScore: decimal('total_score').notNull(),
  dataConfidencePct: decimal('data_confidence_pct').notNull(),
  calculatedAt: timestamp('calculated_at').notNull().defaultNow(),
});

export const departmentRankings = pgTable('department_rankings', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  departmentId: uuid('department_id').notNull().references(() => departments.id),
  period: varchar('period', { length: 20 }).notNull(),
  rank: integer('rank').notNull(),
  previousRank: integer('previous_rank'),
  score: decimal('score').notNull(),
  calculatedAt: timestamp('calculated_at').notNull().defaultNow(),
});
