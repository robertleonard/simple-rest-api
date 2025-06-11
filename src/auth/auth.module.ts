import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CheckCredentialsStrategy, JwtStrategy } from './strategy';
import { PrismaSqlModule } from 'src/prisma-sql/prisma-sql.module';

@Module({
  imports: [PrismaSqlModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CheckCredentialsStrategy],
})
export class AuthModule {}
