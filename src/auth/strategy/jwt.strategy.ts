import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaSqlService } from 'src/prisma-sql/prisma-sql.service';
import { ConfigService } from '@nestjs/config';
// import { Strategy } from "passport-local";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) 
{
    // Inject UsersService to get data about the user that is doing the GET Request
    constructor(private prismaSqlService: PrismaSqlService, private configService: ConfigService)
    {
        const jwtSecret = configService.get('JWT_SECRET');
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        })
    }


    // (method) JwtStrategy.validate(payload: { sub: number; email: string;})
    // : Promise<{
    //     id: number;
    //     username: string;
    //     password: string;
    //     email: string;
    //     role: string;
    // } | null>
    // it returns a promise (because it is async) of user type from UserService (that connects to the prisma database)
    async validate(payload: {sub: number, email: string})
    // validate(payload: any)
    {
        console.log({payload});

        const userPromise = await this.prismaSqlService.user.findUnique({
            where: { id: payload.sub }
        });
        console.log({userPromise});
        
        // !!!
        // TODO: make this work - it gives the error: The operand of a 'delete' operator must be optional.ts(2790) 
        // delete user?.password;


        return userPromise;
        // return { userId: payload.sub, username: userPromise.username, role: userPromise.role };
    }

    // async validate(payload: any) 
    // {
    //     console.log('JWT payload:', payload);
    //     // Whatever you return here becomes req.user
    //     return { userId: payload.sub, username: payload.username, role: payload.role };
    // }
}