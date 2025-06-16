import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { CheckCredentialsGuard } from './guard';

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
  signin(
    @Request() req
  )
  {
    return this.authService.signin(req.user);
  }

  @Post('refresh')
  async refresh(@Body() body: {refreshToken: string}) {

    return this.authService.refreshTokens(body.refreshToken)
  }

}
