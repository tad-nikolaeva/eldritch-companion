import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { users } from './users';

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  keeperId: uuid('keeper_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  scenario: varchar('scenario', { length: 200 }),
  
  // Session data
  participants: jsonb('participants').default([]),
  currentScene: text('current_scene'),
  notes: text('notes'),
  handouts: jsonb('handouts').default([]),
  
  // Session status
  status: varchar('status', { length: 20 }).default('planning').notNull(), // planning, active, completed, archived
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert; 