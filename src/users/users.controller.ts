import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';

@Controller('users')
export class UsersController {

    @UseGuards(AuthGuard('jwt'))
    @Get('user')
    // getUser() 
    // {
    //     return 'user info';
    // }
    getUser(@Req() request: Request)
    {
        return request.user;
    }

}
