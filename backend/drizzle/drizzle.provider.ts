import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../src/db/schema';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const DRIZZLE = Symbol('DRIZZLE');

export const DrizzleProvider: Provider = {
  provide: DRIZZLE,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const connectionString = configService.get<string>(
      'DATABASE_URL',
    ) as string;
    if (!connectionString) {
      throw new Error('No DATABASE_URL set');
    }
    const pool = new Pool({
      connectionString,
    });

    return drizzle(pool, { schema });
  },
};
