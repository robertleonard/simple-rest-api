import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaSqlService } from 'src/prisma-sql/prisma-sql.service';
// import { Strategy } from "passport-local";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) 
{
    // Inject UsersService to get data about the user that is doing the GET Request
    constructor(private prismaSqlService: PrismaSqlService) 
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.",
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
        
        // !!!
        // TODO: make this work - it gives the error: The operand of a 'delete' operator must be optional.ts(2790) 
        // delete user?.password;


        return userPromise;
    }
}