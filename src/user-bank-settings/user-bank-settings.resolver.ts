import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BankSetting } from 'src/bank-settings/schema/bank-setting.schema';
import { BankAccount } from 'src/shared/interfaces/bank-account';
import { BankSettingsService } from '../bank-settings/bank-settings.service';
import { User } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { CreateUserBankSettingInput } from './dto/create-user-bank-setting.dto';
import { UserBankSetting } from './schema/user-bank-setting.schema';
import { UserBankSettingsService } from './user-bank-settings.service';

@Resolver(() => UserBankSetting)
export class UserBankSettingsResolver {
  constructor(
    private readonly userBankSettingsService: UserBankSettingsService,
    private readonly bankSettingsService: BankSettingsService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => UserBankSetting)
  createUserBankSettings(
    @Args('createUserBankSettingDto')
    createUserBankSettingDto: CreateUserBankSettingInput,
  ) {
    return this.userBankSettingsService.create(createUserBankSettingDto);
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
  ): Promise<BankAccount> {
    const { bankAccountType } = userBankSetting;
    return this.userBankSettingsService.findBankAccountByType(
      bankAccountType,
      userBankSetting.bankAccount,
    );
  }
}
