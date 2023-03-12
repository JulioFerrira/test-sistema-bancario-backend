import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BankSetting } from 'src/bank-settings/schema/bank-setting.schema';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BankAccountGetterService } from '../bank-account-getter/bank-account-getter.service';
import { BankSettingsService } from '../bank-settings/bank-settings.service';
import { BankAccountAC } from '../shared/types/bank-account';
import { User } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { CreateUserBankSettingInput } from './dto/create-user-bank-setting.dto';
import { UserBankSetting } from './schema/user-bank-setting.schema';
import { UserBankSettingsService } from './user-bank-settings.service';

@Resolver(() => UserBankSetting)
export class UserBankSettingsResolver {
  constructor(
    private readonly userBankSettingsService: UserBankSettingsService,
    private readonly bankAccountGetterService: BankAccountGetterService,
    private readonly bankSettingsService: BankSettingsService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => UserBankSetting)
  createUserBankSettings(
    @Args('createUserBankSettingDto')
    createUserBankSettingDto: CreateUserBankSettingInput,
  ): Promise<UserBankSetting> {
    return this.userBankSettingsService.create(createUserBankSettingDto);
  }

  @Query(() => UserBankSetting)
  async findOneUserBankSetting(
    @Args('id') id: string,
  ): Promise<UserBankSetting> {
    return this.userBankSettingsService.findOneById(id);
  }

  @Query(() => UserBankSetting)
  @UseGuards(JwtAuthGuard)
  async userBankSetting(
    @CurrentUser() userBankSettings: UserBankSetting,
  ): Promise<UserBankSetting> {
    return userBankSettings;
  }

  @ResolveField()
  async user(@Parent() userBankSetting: UserBankSetting): Promise<User> {
    return this.userService.findOneById(userBankSetting.user);
  }

  @ResolveField()
  async bankSetting(
    @Parent() userBankSetting: UserBankSetting,
  ): Promise<BankSetting> {
    return this.bankSettingsService.findOneById(userBankSetting.bankSetting);
  }

  @ResolveField()
  async bankAccount(
    @Parent() userBankSetting: UserBankSetting,
  ): Promise<BankAccountAC> {
    const { bankAccountType } = userBankSetting;
    return this.bankAccountGetterService.findOneBankAccount({
      accountType: bankAccountType,
      id: userBankSetting.bankAccount,
    });
  }
}
