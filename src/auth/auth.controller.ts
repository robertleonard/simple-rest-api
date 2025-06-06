import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

// Controller is dealing with the logic for the requests: post, get, etc
@Controller('auth')
export class AuthController {
  // using dependency injection
  // in order to not instantiate the AuthService class like this:
  //      authService: AuthService;
  //      constructor(private authService: AuthService) {
  //          this.authService = authService
  //      }
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
  signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto.username, signInDto.password);
  }
}
