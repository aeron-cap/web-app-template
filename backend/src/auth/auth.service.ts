import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'drizzle/drizzle.provider';
import * as sc from '../db/schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE)
    private db: NodePgDatabase<typeof sc>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.db.transaction(async (tx) => {
      const [user] = await tx.insert(sc.usersTable).values(dto).returning();
      return user;
    });

    return user;
  }
}
