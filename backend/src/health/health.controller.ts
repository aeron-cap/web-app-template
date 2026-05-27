import { Controller, Get, Inject } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckError,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Public } from 'src/auth/decorator/public.decorator';
import { DRIZZLE } from 'src/drizzle/drizzle.provider';
import * as sc from '../db/schema';
import { sql } from 'drizzle-orm';

@Controller('health')
export class HealthController {
  constructor(
    @Inject(DRIZZLE)
    private db: NodePgDatabase<typeof sc>,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      async () => {
        try {
          await this.db.execute(sql`SELECT 1`);
          return {
            database: {
              status: 'up',
              message: 'Database connection successful',
            },
          };
        } catch (error) {
          throw new HealthCheckError('Database connection failed', {
            database: {
              status: 'down',
              message: 'Database connection failed: ' + error,
            },
          });
        }
      },
    ]);
  }
}
