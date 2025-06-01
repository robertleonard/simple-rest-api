import { Injectable } from "@nestjs/common";

// the service is dealing with the business logic:
// - connecting to the database
// - editing the fields
// - etc 
@Injectable({})
export class AuthService {

    signup () {
        return {msg: 'I have signed up'}
    }

    signin () {
        return {msg: 'I have signed in'}
    }
}