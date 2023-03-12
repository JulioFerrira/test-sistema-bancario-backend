import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

import { UserBankSetting } from '../../user-bank-settings/schema/user-bank-setting.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,

    ConfigService: ConfigService,
  ) {
    super({
      secretOrKey: ConfigService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserBankSetting> {
    const { id } = payload;
    const user = await this.authService.validateUser(id);
    return user;
  }
}
