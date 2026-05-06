import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DrizzleProvider } from 'drizzle/drizzle.provider';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, DrizzleProvider],
})
export class AuthModule {}
