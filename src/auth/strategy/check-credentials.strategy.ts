import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserDto } from '../../users/dto/user.dto';

@Injectable()
export class CheckCredentialsStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    const user: UserDto = await this.authService.validateUserLogin(username, password);
    console.log(__filename, '\nuser: ', user);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user; // will be attached to req.user
  }
}
