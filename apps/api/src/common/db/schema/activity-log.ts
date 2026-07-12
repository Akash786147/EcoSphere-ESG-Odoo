import { pgTable, uuid, varchar, json, timestamp } from 'drizzle-orm/pg-core';
import { organizations } from './platform.js';
import { employees } from './people.js';

export const activityLog = pgTable('activity_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  actorId: uuid('actor_id').references(() => employees.id),
  entityType: varchar('entity_type', { length: 100 }).notNull(),
  entityId: uuid('entity_id').notNull(),
  action: varchar('action', { length: 50 }).notNull(), 
  beforeState: json('before_state'),
  afterState: json('after_state'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
