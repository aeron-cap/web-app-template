import { Module } from '@nestjs/common';
import { DRIZZLE, DrizzleProvider } from 'drizzle/drizzle.provider';

@Module({
  providers: [DrizzleProvider],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
