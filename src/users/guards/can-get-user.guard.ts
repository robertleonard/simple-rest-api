import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users.service';
import { CAN_GET_USER } from '../decorators/can-get-user.decorator';
import { Role } from 'src/auth/enum';
import { Request } from 'express';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class CanGetUserGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isProtected = this.reflector.get<boolean>(CAN_GET_USER, context.getHandler());
    if (!isProtected) {return true;}

    const req: Request = context.switchToHttp().getRequest();
    const user: UserDto = req.user as UserDto;
    const getUserId = +req.params.id;

    // Admins can edit everything
    if (user.role === Role.Admin) {return true;}

    // A user can only get his own user information
    if (getUserId === user.id) {return true;}

    throw new ForbiddenException('You cannot see this user');
  }
}
