import { pgTable, uuid, varchar, text, boolean, timestamp, json, integer } from 'drizzle-orm/pg-core';
import { organizations } from './platform.js';
import { employees } from './people.js';

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  recipientId: uuid('recipient_id').notNull().references(() => employees.id),
  type: varchar('type', { length: 50 }).notNull(), 
  title: varchar('title', { length: 255 }).notNull(),
  body: text('body').notNull(),
  payload: json('payload'),
  isRead: boolean('is_read').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const notificationQueue = pgTable('notification_queue', {
  id: uuid('id').primaryKey().defaultRandom(),
  notificationId: uuid('notification_id').notNull().references(() => notifications.id),
  channel: varchar('channel', { length: 50 }).notNull(), 
  status: varchar('status', { length: 50 }).notNull().default('PENDING'),
  attempts: integer('attempts').notNull().default(0),
  maxAttempts: integer('max_attempts').notNull().default(3),
  nextRetryAt: timestamp('next_retry_at'),
  errorMessage: text('error_message'),
  sentAt: timestamp('sent_at'),
});
