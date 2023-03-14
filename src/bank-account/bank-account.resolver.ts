import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserBankSetting } from '../user-bank-settings/schema/user-bank-setting.schema';
import { BankAccountService } from './bank-account.service';
import { GetBankAccountInput } from './dto/get-account.input';
import { TransferBalanceInput } from './dto/transfer-balance-input';
import { BankAccount } from './schema/bank-account.schema';

@Resolver(() => BankAccount)
export class BankAccountResolver {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Query(() => BankAccount)
  @UseGuards(JwtAuthGuard)
  findOneBankAccount(
    @Args('getBankAccountGetterInput')
    getBankAccountGetterInput: GetBankAccountInput,
  ) {
    return this.bankAccountService.findOneBankAccount(
      getBankAccountGetterInput,
    );
  }

  @Query(() => Boolean)
  transferBalance(
    @CurrentUser() userBankSetting: UserBankSetting,
    @Args('transferBalanceInput') transferBalanceInput: TransferBalanceInput,
  ) {
    return this.bankAccountService.transferBalance(
      transferBalanceInput,
      userBankSetting,
    );
  }
}
