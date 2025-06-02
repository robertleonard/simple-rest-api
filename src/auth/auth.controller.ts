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
        @Body('username') username: string,
        @Body('email') email: string, 
        @Body('password') password: string,
        @Body('role') role: string
    ) {

        console.log({
            username,
            email,
            password,
            role
        });


        return this.authService.signup(username, email, password, role);
    }

    @Post('signin')
    signin() {
        return this.authService.signin()
    }

}