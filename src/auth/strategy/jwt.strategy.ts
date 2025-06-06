import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaSqlService } from 'src/prisma-sql/prisma-sql.service';
import { ConfigService } from '@nestjs/config';
// import { Strategy } from "passport-local";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Inject UsersService to get data about the user that is doing the GET Request
  constructor(
    private prismaSqlService: PrismaSqlService,
    private configService: ConfigService,
  ) {
    const jwtSecret = configService.get('JWT_SECRET');
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

    // !!!
    // TODO: make this work - it gives the error: The operand of a 'delete' operator must be optional.ts(2790)
    // delete userPromise?.password;

    return userPromise;
  }
}
