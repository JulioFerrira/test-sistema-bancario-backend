import { Injectable } from '@nestjs/common';
import { EBankAccoutType } from 'src/bank-accounts-factory/types/accounts-type-enum';
import { CheckingAccountService } from '../checking-account/checking-account.service';
import { SavingsAccountService } from '../savings-account/savings-account.service';
import { BankAccountAC } from '../shared/types/bank-account';
import { GetBankAccountGetterInput } from './dto/get-account.input';
import { UpdateBankAccountGetterInput } from './dto/update-bank-account-getter.input';

@Injectable()
export class BankAccountGetterService {
  constructor(
    private readonly checkingAccountService: CheckingAccountService,
    private readonly savingsAccountService: SavingsAccountService,
  ) {}

  findAll() {
    return `This action returns all bankAccountGetter`;
  }

  async findOneBankAccount(
    getBankAccountGetterInput: GetBankAccountGetterInput,
  ): Promise<BankAccountAC> {
    const { accountType, id } = getBankAccountGetterInput;
    switch (accountType) {
      case EBankAccoutType.CHECKING:
        return await this.checkingAccountService.findOneById(id);

      case EBankAccoutType.SAVINGS:
        return await this.savingsAccountService.findOneById(id);

      default:
        throw new Error('Account type not found');
    }
  }

  update(
    id: number,
    updateBankAccountGetterInput: UpdateBankAccountGetterInput,
  ) {
    return `This action updates a #${id} bankAccountGetter`;
  }
}
