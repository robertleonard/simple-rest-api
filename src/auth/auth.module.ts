import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { PrismaSqlModule } from 'src/prisma-sql/prisma-sql.module';

@Module({
    imports:        [
                        PrismaSqlModule, 
                        JwtModule.register({
                            global:         true,
                            secret:         "DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.",
                            // secret:         JWT_SECRET,
                            signOptions:    {expiresIn: '60m'}
                        })
                    ],
    controllers:    [AuthController],
    providers:      [AuthService, JwtStrategy],
}) 
export class AuthModule {}