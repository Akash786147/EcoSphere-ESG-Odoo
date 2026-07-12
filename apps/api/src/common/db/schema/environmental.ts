import { pgTable, uuid, varchar, decimal, date, boolean } from 'drizzle-orm/pg-core';
import { organizations } from './platform.js';
import { departments } from './people.js';

export const emissionFactors = pgTable('emission_factors', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  activityName: varchar('activity_name', { length: 255 }).notNull(),
  scope: varchar('scope', { length: 50 }).notNull(), 
  co2ePerUnit: decimal('co2e_per_unit').notNull(),
  unit: varchar('unit', { length: 50 }).notNull(),
  source: varchar('source', { length: 100 }).notNull(),
  validFrom: date('valid_from').notNull(),
  validTo: date('valid_to'),
  status: varchar('status', { length: 50 }).notNull().default('ACTIVE'),
});

export const productEsgProfiles = pgTable('product_esg_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  productName: varchar('product_name', { length: 255 }).notNull(),
  sku: varchar('sku', { length: 100 }).notNull(),
  carbonFootprintPerUnit: decimal('carbon_footprint_per_unit').notNull(),
  recyclabilityPct: decimal('recyclability_pct').notNull(),
  certifications: varchar('certifications', { length: 500 }),
  status: varchar('status', { length: 50 }).notNull().default('ACTIVE'),
});

export const vendors = pgTable('vendors', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  name: varchar('name', { length: 255 }).notNull(),
  vendorCode: varchar('vendor_code', { length: 100 }).notNull(),
  vendorType: varchar('vendor_type', { length: 50 }).notNull(), 
  country: varchar('country', { length: 2 }),
  esgRating: varchar('esg_rating', { length: 50 }),
  sustainabilityCertified: boolean('sustainability_certified').notNull().default(false),
  status: varchar('status', { length: 50 }).notNull().default('ACTIVE'),
});

export const erpOperations = pgTable('erp_operations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  type: varchar('type', { length: 50 }).notNull(),
  departmentId: uuid('department_id').notNull().references(() => departments.id),
  vendorId: uuid('vendor_id').references(() => vendors.id),
  description: varchar('description', { length: 500 }).notNull(),
  quantity: decimal('quantity').notNull(),
  unit: varchar('unit', { length: 50 }).notNull(),
  amount: decimal('amount').notNull(),
  operationDate: date('operation_date').notNull(),
});

export const carbonTransactions = pgTable('carbon_transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  erpOperationId: uuid('erp_operation_id').references(() => erpOperations.id),
  emissionFactorId: uuid('emission_factor_id').references(() => emissionFactors.id),
  departmentId: uuid('department_id').notNull().references(() => departments.id),
  productId: uuid('product_id').references(() => productEsgProfiles.id),
  vendorId: uuid('vendor_id').references(() => vendors.id),
  scope: varchar('scope', { length: 50 }).notNull(),
  activityValue: decimal('activity_value').notNull(),
  co2eCalculated: decimal('co2e_calculated').notNull(),
  dataQuality: varchar('data_quality', { length: 50 }).notNull(),
  entryMode: varchar('entry_mode', { length: 50 }).notNull(),
  transactionDate: date('transaction_date').notNull(),
});

export const environmentalGoals = pgTable('environmental_goals', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  title: varchar('title', { length: 255 }).notNull(),
  departmentId: uuid('department_id').references(() => departments.id),
  metric: varchar('metric', { length: 50 }).notNull(),
  targetValue: decimal('target_value').notNull(),
  baselineValue: decimal('baseline_value').notNull(),
  startDate: date('start_date').notNull(),
  targetDate: date('target_date').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('ACTIVE'),
});

export const goalForecasts = pgTable('goal_forecasts', {
  id: uuid('id').primaryKey().defaultRandom(),
  goalId: uuid('goal_id').notNull().references(() => environmentalGoals.id),
  forecastDate: date('forecast_date').notNull(),
  projectedValue: decimal('projected_value').notNull(),
  projectedBreachDate: date('projected_breach_date'),
  deviationPct: decimal('deviation_pct').notNull(),
});
