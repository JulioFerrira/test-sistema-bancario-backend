import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UserBankSetting } from '../user-bank-settings/schema/user-bank-setting.schema';
import { UserBankSettingsService } from '../user-bank-settings/user-bank-settings.service';
import { UserService } from '../user/user.service';
import { LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly userBankSettingsService: UserBankSettingsService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(userId: string): string {
    return this.jwtService.sign({ id: userId });
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;
    const user = await this.usersService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Email / Password do not match');
    }

    const userBankSettings = await this.userBankSettingsService.findOneByUserId(
      user.id,
    );

    const token = this.getJwtToken(userBankSettings.id);

    return {
      token,
    };
  }

  async validateUser(id: string): Promise<UserBankSetting> {
    const user = await this.userBankSettingsService.findOneById(id);
    return user;
  }

  revalidateToken(userBankSettings: UserBankSetting): AuthResponse {
    const token = this.getJwtToken(userBankSettings.id);

    return { token };
  }
}
