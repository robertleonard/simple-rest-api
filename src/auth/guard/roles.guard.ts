import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enum";
import { ROLES_KEY } from "../decorator/roles.decorator";




@Injectable()
export class RolesGuard implements CanActivate
{

    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean//Promise<boolean> 
    {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>( ROLES_KEY,
                                                                        [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }
        console.log(requiredRoles)

        const req = context.switchToHttp().getRequest();

        return requiredRoles.includes(req.user.role);
    }

}
