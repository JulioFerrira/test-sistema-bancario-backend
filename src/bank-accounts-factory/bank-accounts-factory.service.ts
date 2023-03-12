import { Injectable } from '@nestjs/common';
import { CheckingAccountService } from '../checking-account/checking-account.service';
import { SavingsAccountService } from '../savings-account/savings-account.service';
import { CreateBankAccountsFactoryInput } from './dto/create-bank-accounts-factory.input';
import { EBankAccoutType } from './types/accounts-type-enum';

@Injectable()
export class BankAccountsFactoryService {
  constructor(
    private readonly checkingAccountService: CheckingAccountService,
    private readonly savingsAccountService: SavingsAccountService,
  ) {}

  async createBankAccount(
    createBankAccountsFactoryInput: CreateBankAccountsFactoryInput,
  ) {
    const { accountType, balance } = createBankAccountsFactoryInput;
    const createBankAccount = {
      [EBankAccoutType.CHECKING]: await this.checkingAccountService.create({
        balance,
      }),
      [EBankAccoutType.SAVINGS]: await this.savingsAccountService.create({
        balance,
      }),
      default: null,
    };
    return createBankAccount[accountType] || createBankAccount.default;
  }
}
