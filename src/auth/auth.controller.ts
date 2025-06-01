import { Body, Controller, Post, Req } from '@nestjs/common';
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
    signup(@Body() dto : any) {

        console.log({
            dto,
        });

        return this.authService.signup()
    }

    @Post('signin')
    signin() {
        return this.authService.signin()
    }

}