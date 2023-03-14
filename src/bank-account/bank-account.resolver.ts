import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserBankSetting } from '../user-bank-settings/schema/user-bank-setting.schema';
import { BankAccountService } from './bank-account.service';
import { DepositBalanceInput } from './dto/deposit-balance.input';
import { GetBankAccountInput } from './dto/get-account.input';
import { TransferBalanceContactInput } from './dto/transfer-balance-contact.input';
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

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  transferBalance(
    @CurrentUser() userBankSetting: UserBankSetting,
    @Args('transferBalanceInput') transferBalanceInput: TransferBalanceInput,
  ) {
    return this.bankAccountService.transferBalance(
      transferBalanceInput,
      userBankSetting,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  transferBalanceContact(
    @CurrentUser() userBankSetting: UserBankSetting,
    @Args('transferBalanceContactInput')
    transferBalanceContactInput: TransferBalanceContactInput,
  ) {
    return this.bankAccountService.transferBalanceToContact(
      transferBalanceContactInput,
      userBankSetting,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  depositBalance(
    @Args('depositBalanceInput')
    depositBalanceInput: DepositBalanceInput,
    @CurrentUser() userBankSetting: UserBankSetting,
  ) {
    return this.bankAccountService.depositBalance(
      depositBalanceInput,
      userBankSetting,
    );
  }
}
