import { usersTable } from 'src/db/schema';

type InsertUser = typeof usersTable.$inferInsert;

export type CreateUser = Omit<InsertUser, 'id' | 'createdAt' | 'editedAt'>;
