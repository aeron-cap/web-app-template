import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { CreateUser } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateUser) {
    return this.authService.createUser(dto);
  }
}
