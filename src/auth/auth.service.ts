import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { UsersService } from "src/users/users.service";

// the service is dealing with the business logic:
// - connecting to the database
// - editing the fields
// - etc 
@Injectable({})
export class AuthService {

    constructor(private userService : UsersService) {}

    async signup (username: string, email: string, password: string, role: string) {

        // generate the password hash
        const staltOrRounds = 10;
        const hash = await bcrypt.hash(password, staltOrRounds);

        // save the new user in the Data Base
        const user = await this.userService.user.create({
            data: {
                username: username,
                password: hash,
                email: email,
                role: role
            }
        });

        return {msg: 'I have signed up'}
    }

    async signin (loginUsername: string, loginPassword: string) {
        console.log(loginUsername, loginPassword);
        const user = await this.userService.user.findFirst({
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

        // TODO: Generate a JWT and return it here
        // instead of the user object

        return {msg: 'I have signed in'}
    }
}