import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaSqlService } from 'src/prisma-sql/prisma-sql.service';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../users/dto/user.dto';

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

  async validateUserLogin(loginUsername: string, loginPassword: string): Promise<UserDto> {
    const user = await this.prismaSqlService.user.findFirst({
      where: {
        username: loginUsername,
      },
    });
    if (!user) {throw new UnauthorizedException();}

    if (user.password) {
      if (!(await bcrypt.compare(loginPassword, user.password))) {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }

    const { password, refreshToken, email, role, ...result } = user; // remove password
    return result;
  }

  async signin(
    userId: number,
    username: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const accessToken = await this.signToken(userId, username);
    const refreshToken = await this.signRefreshToken(userId, username);

    await this.saveRefreshToken(userId, refreshToken);

    return { access_token: accessToken, refresh_token: refreshToken };
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

  async signRefreshToken(userId: number, username: string): Promise<string> {
    const payload = {
      sub: userId,
      username,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });
  }

  async saveRefreshToken(userId: number, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    const user = await this.prismaSqlService.user.update({
      where: { id: userId },
      data: { refreshToken: hashedToken },
    });
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
      const user = await this.prismaSqlService.user.findUnique({ where: { id: payload.sub } });

      if (!user || !user.refreshToken) {
        throw new ForbiddenException('Access Denied');
      }

      return this.signin(user.id, user.username);
    } catch (error) {
      throw new ForbiddenException('Invalid Token');
    }
  }
}
