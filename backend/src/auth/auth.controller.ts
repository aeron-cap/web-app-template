import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorator/public.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { UserResponseDto } from '../user/dto/user-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
  @Public()
  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  @ApiBody({ type: LoginDto })
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
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { message: response.message };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }

  @ApiResponse({ type: UserResponseDto })
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
