import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";


@Injectable()
export class CheckCredentialsStrategy extends PassportStrategy(Strategy)
{
    constructor(private authService: AuthService) 
    {
        super();
    }

    async validate(username: string, password: string): Promise<any> 
    {
        const user = await this.authService.validateUserLogin(username, password)
        if(!user) {
            throw new UnauthorizedException()
        }


        return user; // will be attached to req.user
    }
}