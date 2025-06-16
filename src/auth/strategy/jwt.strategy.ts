import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaSqlService } from 'src/prisma-sql/prisma-sql.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Inject UsersService to get data about the user that is doing the GET Request
  constructor(
    private prismaSqlService: PrismaSqlService,
    private configService: ConfigService,
  ) {
    const jwtSecret: string = configService.get('JWT_SECRET') as string;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const userPromise = await this.prismaSqlService.user.findUnique({
      where: { id: payload.sub },
    });

    // Using userPromise as any in order to force delete the password field without getting the TS error
    if (userPromise?.password) {
      delete (userPromise as any).password;
    }
    return userPromise; // will be attached to req.user
  }
}
