import { pgTable, uuid, varchar, timestamp, decimal, boolean, jsonb } from 'drizzle-orm/pg-core';

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  industry: varchar('industry', { length: 100 }),
  country: varchar('country', { length: 2 }),
  currency: varchar('currency', { length: 3 }),
  timezone: varchar('timezone', { length: 100 }),
  logoUrl: varchar('logo_url', { length: 500 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  status: varchar('status', { length: 50 }).notNull().default('ACTIVE'), // ACTIVE | SUSPENDED
});

export const esgConfigurations = pgTable('esg_configurations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  envWeight: decimal('env_weight', { precision: 5, scale: 2 }).notNull().default('40.00'),
  socialWeight: decimal('social_weight', { precision: 5, scale: 2 }).notNull().default('30.00'),
  govWeight: decimal('gov_weight', { precision: 5, scale: 2 }).notNull().default('30.00'),
  autoEmissionCalc: boolean('auto_emission_calc').notNull().default(true),
  evidenceRequired: boolean('evidence_required').notNull().default(true),
  badgeAutoAward: boolean('badge_auto_award').notNull().default(true),
  notificationSettings: jsonb('notification_settings').default({}),
});
