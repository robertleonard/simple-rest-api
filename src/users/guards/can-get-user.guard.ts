import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UsersService } from "../users.service";
import { CAN_GET_USER } from "../decorators/can-get-user.decorator";
import { Role } from "src/auth/enum";


@Injectable()
export class CanGetUserGuard implements CanActivate {
  constructor(private reflector: Reflector, private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> 
  {
    console.log("CanGetUserGuard")
    const isProtected = this.reflector.get<boolean>(CAN_GET_USER, context.getHandler());
    if (!isProtected) return true;

    const req = context.switchToHttp().getRequest();
    // console.log(req)
    const user = req.user;
    console.log(user)

    const getUserId = +req.params.id;
    console.log(getUserId)
    
    // Admins can edit everything
    if (user.role === Role.Admin) return true;

    // A user can only get his own user information
    console.log(getUserId, user.id)
    if (getUserId === user.id) return true;

    throw new ForbiddenException('You cannot see this user');
  }
}