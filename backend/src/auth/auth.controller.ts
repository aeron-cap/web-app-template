import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorator/public.decorator';
import { ApiBody } from '@nestjs/swagger';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: [CreateUserDto] })
  @Public()
  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  @ApiBody({ type: [LoginDto] })
  @Public()
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.authService.login(dto);

    res.cookie('access_token', response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    return { message: response.message };
  }
}
