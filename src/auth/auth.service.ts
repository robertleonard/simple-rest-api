import { Injectable } from "@nestjs/common";
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

    signin () {
        return {msg: 'I have signed in'}
    }
}