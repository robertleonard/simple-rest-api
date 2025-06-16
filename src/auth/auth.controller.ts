import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { CheckCredentialsGuard } from './guard';
import { UserDto } from '../users/dto/user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() singUpDto: SignUpDto) {
    return this.authService.signup(
      singUpDto.username,
      singUpDto.email,
      singUpDto.password,
      singUpDto.role,
    );
  }

  @Post('signin')
  @UseGuards(CheckCredentialsGuard)
  signin(@Req() req: Request) {
    const user: UserDto = req.user as UserDto;
    return this.authService.signin(+user.id, user.username);
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refreshTokens(body.refreshToken);
  }
}
