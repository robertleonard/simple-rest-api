import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guard';
import { CanGetUserGuard } from './guards/can-get-user.guard';
import { CanGetUser } from './decorators/can-get-user.decorator';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/enum';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET USER
  // Returns the details of the user mentioned in endpoint
  // - Admin can get any user
  // - User can only get himself
  @Get('user/:id')
  @UseGuards(JwtAuthGuard, CanGetUserGuard)
  @CanGetUser()
  getUser(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  // GET ALL USERS
  // - only Admin
  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  getAllUsers() {
    const users = this.usersService.getAllUsers();
    return users;
  }

  // DELETE USER
  // Removes the user mentioned in endpoint
  // - Admin can remove any user
  // - User can only remove himself
  @Delete('user/:id')
  @UseGuards(JwtAuthGuard, CanGetUserGuard)
  @CanGetUser()
  removeUser(@Param('id') id: string) {
    const user = this.usersService.removeUserById(id);
    return user;
  }
}
