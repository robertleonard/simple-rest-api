import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

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
    // use a Data Transfer Object to get the body from the http request 
    signup(
        // @Body('username') username: string,
        // @Body('email') email: string, 
        // @Body('password') password: string,
        // @Body('role') role: string
        @Body() singUpDto
    ) {

        // console.log({
        //     singUpDto.username,
        //     singUpDto.email,
        //     singUpDto.password,
        //     singUpDto.role
        // });


        return this.authService.signup(singUpDto.username, singUpDto.email, singUpDto.password, singUpDto.role);
    }

    @Post('signin')
    signin(
        // @Body('username') username: string,
        // @Body('email') email: string,
        // @Body('password') password: string
        @Body() signInDto
    ) {
        return this.authService.signin(signInDto.username, signInDto.password);
    }

}