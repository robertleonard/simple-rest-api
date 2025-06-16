import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../auth/enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const req: Request = context.switchToHttp().getRequest();

    const user: UserDto = req.user as UserDto;
    // console.log(__filename, 'user: ', user);
    // console.log(__filename, 'requiredRoles: ', requiredRoles);

    if (!user.role) {
      return false;
    } else {
      return requiredRoles.includes(user.role as Role);
    }
  }
}
