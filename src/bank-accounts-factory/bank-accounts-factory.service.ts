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
    const { accountType, balance } = createBankAccountsFactoryInput;
    switch (accountType) {
      case EBankAccoutType.CHECKING:
        return await this.checkingAccountService.create({ balance });

      case EBankAccoutType.SAVINGS:
        return await this.savingsAccountService.create({ balance });

      default:
        throw new Error('Invalid account type');
    }
  }
}
