import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'drizzle/drizzle.provider';
import * as sc from '../db/schema';
import { CreateUser } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE)
    private db: NodePgDatabase<typeof sc>,
  ) {}

  async createUser(dto: CreateUser) {
    const [user] = await this.db.insert(sc.usersTable).values(dto).returning();
    return user;
  }
}
