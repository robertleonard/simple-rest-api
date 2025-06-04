import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { PrismaSqlService } from "src/prisma-sql/prisma-sql.service";

// the service is dealing with the business logic:
// - connecting to the database
// - editing the fields
// - etc 
@Injectable({})
export class AuthService {

    constructor(
        private prismaSqlService : PrismaSqlService,
        private jwtService : JwtService
    ) {}

    async signup (username: string, email: string, password: string, role: string) 
    {

        // generate the password hash
        const staltOrRounds = 10;
        const hash = await bcrypt.hash(password, staltOrRounds);

        // save the new user in the Data Base
        const user = await this.prismaSqlService.user.create({
            data: {
                username: username,
                password: hash,
                email: email,
                role: role
            }
        });

        return {msg: 'I have signed up'}
    }

    async signin (
        loginUsername: string, 
        loginPassword: string
    )
    : Promise<{access_token: string}> 
    {

        
        console.log(loginUsername, loginPassword);
        const user = await this.prismaSqlService.user.findFirst({
            where: {
                username: loginUsername
            }
        });

        // generate the password hash
        // const staltOrRounds = 10;
        // const loginHash = await bcrypt.hash(loginPassword, staltOrRounds);

        // console.log(user?.password, loginHash);
        //if (user?.password !== loginHash) {
        if(user?.password)
        {
            if( !(await bcrypt.compare(loginPassword, user.password)) ) 
            {
                console.log('throw new UnauthorizedException()');
                throw new UnauthorizedException();
            }
            
        }
        else
        {
            throw new UnauthorizedException();
        }


        const payload = {sub: user.id, username: user.username};
        return { access_token: await this.jwtService.signAsync(payload) };
    }
}