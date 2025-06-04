import { Body, Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController 
{

    constructor(
        private usersService : UsersService
    ) {};

    @UseGuards(AuthGuard('jwt'))
    @Get('user')
    // getUser() 
    // {
    //     return 'user info';
    // }
    getUser(@Req() request: Request, @Body() taskDto)
    {
        console.log(taskDto) 
        return request.user;
    }



    @Delete(':id')
    remove(@Param('id') id: string)
    {
        const user = this.usersService.remove(id);
        return user;
    }

}
