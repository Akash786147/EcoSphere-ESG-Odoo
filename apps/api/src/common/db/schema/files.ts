import { pgTable, uuid, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { organizations } from './platform.js';
import { employees } from './people.js';

export const files = pgTable('files', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  url: varchar('url', { length: 1000 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  sizeBytes: integer('size_bytes').notNull(),
  originalName: varchar('original_name', { length: 255 }).notNull(),
  uploadedBy: uuid('uploaded_by').references(() => employees.id),
  entityType: varchar('entity_type', { length: 100 }), 
  entityId: uuid('entity_id'),
  purpose: varchar('purpose', { length: 50 }).notNull(), 
  uploadedAt: timestamp('uploaded_at').notNull().defaultNow(),
});
