import { pgTable, uuid, varchar, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';
import { users } from './users';

export const characters = pgTable('characters', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  occupation: varchar('occupation', { length: 100 }),
  age: integer('age'),
  description: text('description'),
  backstory: text('backstory'),
  
  // Call of Cthulhu stats
  strength: integer('strength').default(0),
  constitution: integer('constitution').default(0),
  power: integer('power').default(0),
  dexterity: integer('dexterity').default(0),
  appearance: integer('appearance').default(0),
  size: integer('size').default(0),
  intelligence: integer('intelligence').default(0),
  education: integer('education').default(0),
  
  // Derived stats
  hitPoints: integer('hit_points').default(0),
  sanity: integer('sanity').default(0),
  magicPoints: integer('magic_points').default(0),
  luck: integer('luck').default(0),
  
  // Skills and equipment
  skills: jsonb('skills').default([]),
  equipment: jsonb('equipment').default([]),
  notes: text('notes'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Character = typeof characters.$inferSelect;
export type NewCharacter = typeof characters.$inferInsert; 