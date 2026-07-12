import { pgTable, uuid, varchar, date, decimal, json, timestamp } from 'drizzle-orm/pg-core';
import { organizations } from './platform.js';
import { departments } from './people.js';

export const analyticsSnapshots = pgTable('analytics_snapshots', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  departmentId: uuid('department_id').references(() => departments.id),
  periodType: varchar('period_type', { length: 50 }).notNull(), 
  periodStart: date('period_start').notNull(),
  periodEnd: date('period_end').notNull(),
  metricKey: varchar('metric_key', { length: 100 }).notNull(),
  metricValue: decimal('metric_value').notNull(),
  previousValue: decimal('previous_value'),
  breakdown: json('breakdown'),
  calculatedAt: timestamp('calculated_at').notNull().defaultNow(),
});

export const kpiMetrics = pgTable('kpi_metrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  kpiKey: varchar('kpi_key', { length: 100 }).notNull(),
  currentValue: decimal('current_value').notNull(),
  previousValue: decimal('previous_value'),
  trendDirection: varchar('trend_direction', { length: 20 }).notNull(), 
  trendPct: decimal('trend_pct'),
  riskLevel: varchar('risk_level', { length: 20 }).notNull(), 
  calculatedAt: timestamp('calculated_at').notNull().defaultNow(),
});
