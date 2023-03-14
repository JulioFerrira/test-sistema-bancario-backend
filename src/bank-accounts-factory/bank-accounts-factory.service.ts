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

  async create(createBankAccountsFactoryInput: CreateBankAccountsFactoryInput) {
    const { accountType } = createBankAccountsFactoryInput;
    switch (accountType) {
      case EBankAccoutType.CHECKING:
        return await this.checkingAccountService.create(
          createBankAccountsFactoryInput,
        );

      case EBankAccoutType.SAVINGS:
        return await this.savingsAccountService.create(
          createBankAccountsFactoryInput,
        );

      default:
        throw new Error('Invalid account type');
    }
  }
}
