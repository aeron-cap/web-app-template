import { uuid } from 'drizzle-orm/pg-core';
import { pgTable, timestamp, text, boolean } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().default('user'),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  editedAt: timestamp('edited_at').defaultNow(),
  isAdmin: boolean('is_admin').default(false),
});
