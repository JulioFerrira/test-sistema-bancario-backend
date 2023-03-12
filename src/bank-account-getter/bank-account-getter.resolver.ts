import { Args, Query, Resolver } from '@nestjs/graphql';
import { BankAccountAC } from '../shared/types/bank-account';
import { BankAccountGetterService } from './bank-account-getter.service';
import { GetBankAccountGetterInput } from './dto/get-account.input';

@Resolver(() => BankAccountAC)
export class BankAccountGetterResolver {
  constructor(
    private readonly bankAccountGetterService: BankAccountGetterService,
  ) {}

  @Query(() => [BankAccountAC])
  findAllBankAccount() {
    return this.bankAccountGetterService.findAll();
  }

  @Query(() => BankAccountAC)
  findOneBankAccount(
    @Args('getBankAccountGetterInput')
    getBankAccountGetterInput: GetBankAccountGetterInput,
  ) {
    return this.bankAccountGetterService.findOneBankAccount(
      getBankAccountGetterInput,
    );
  }
}
