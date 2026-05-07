import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { usersTable } from 'src/db/schema';

type InsertUser = typeof usersTable.$inferInsert;

export type NewUser = Omit<InsertUser, 'id' | 'createdAt' | 'editedAt'>;

export class CreateUserDto implements NewUser {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean = false;
}
