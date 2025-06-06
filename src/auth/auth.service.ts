import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaSqlService } from 'src/prisma-sql/prisma-sql.service';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prismaSqlService: PrismaSqlService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(username: string, email: string, password: string, role: string) {
    // generate the password hash
    const staltOrRounds = 10;
    const hash = await bcrypt.hash(password, staltOrRounds);

    // save the new user in the Data Base
    const user = await this.prismaSqlService.user.create({
      data: {
        username: username,
        password: hash,
        email: email,
        role: role,
      },
    });

    return { msg: 'I have signed up' };
  }

  async signin(loginUsername: string, loginPassword: string): Promise<{ access_token: string }> {
    const user = await this.prismaSqlService.user.findFirst({
      where: {
        username: loginUsername,
      },
    });

    if (user?.password) {
      if (!(await bcrypt.compare(loginPassword, user.password))) {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }

    return { access_token: await this.signToken(user.id, user.username) };
  }

  async signToken(userId: number, username: string): Promise<string> {
    const payload = {
      sub: userId,
      username,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
