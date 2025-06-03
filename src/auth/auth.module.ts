import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UsersModule, 
        JwtModule.register({
            global:         true,
            secret:         "DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.",
            signOptions:    {expiresIn: '60s'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}