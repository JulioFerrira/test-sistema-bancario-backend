import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';

import { UseGuards } from '@nestjs/common';
import { UserBankSetting } from '../user-bank-settings/schema/user-bank-setting.schema';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginInput } from './dto/inputs';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthResponse } from './types/auth-response.types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(
    @CurrentUser() userBankSettings: UserBankSetting,
  ): AuthResponse {
    return this.authService.revalidateToken(userBankSettings);
  }
}
