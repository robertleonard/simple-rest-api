import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
    imports: [
        UsersModule, 
        JwtModule.register({
            global:         true,
            secret:         "DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.",
            // secret:         JWT_SECRET,
            signOptions:    {expiresIn: '60m'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
}) 
export class AuthModule {}