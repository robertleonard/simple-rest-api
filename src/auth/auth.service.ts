import { Injectable } from "@nestjs/common";
import { User, Task, Role } from "generated/prisma";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

// the service is dealing with the business logic:
// - connecting to the database
// - editing the fields
// - etc 
@Injectable({})
export class AuthService {

    constructor(private prismaService : PrismaService) {}

    signup () {
        return {msg: 'I have signed up'}
    }

    signin () {
        return {msg: 'I have signed in'}
    }
}