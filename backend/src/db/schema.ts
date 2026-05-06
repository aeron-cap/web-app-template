import {
  pgTable,
  timestamp,
  text,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  editedAt: timestamp('edited_at').defaultNow(),
  isAdmin: boolean('is_admin').default(false),
});
