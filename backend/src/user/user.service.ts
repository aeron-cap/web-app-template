import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../drizzle/drizzle.provider';
import * as sc from '../db/schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(DRIZZLE)
    private db: NodePgDatabase<typeof sc>,
  ) {}
}
