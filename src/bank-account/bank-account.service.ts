import { Injectable } from '@nestjs/common';
import { EBankAccoutType } from 'src/bank-accounts-factory/types/accounts-type-enum';
import { CheckingAccountService } from '../checking-account/checking-account.service';
import { SavingsAccountService } from '../savings-account/savings-account.service';
import { UserBankSetting } from '../user-bank-settings/schema/user-bank-setting.schema';
import { GetBankAccountInput } from './dto/get-account.input';
import { TransferBalanceInput } from './dto/transfer-balance-input';
import { UpdateBankAccountGetterInput } from './dto/update-bank-account-getter.input';
import { BankAccount } from './schema/bank-account.schema';

@Injectable()
export class BankAccountService {
  constructor(
    private readonly checkingAccountService: CheckingAccountService,
    private readonly savingsAccountService: SavingsAccountService,
  ) {}

  findAll() {
    return `This action returns all bankAccountGetter`;
  }

  async findOneBankAccount(
    getBankAccountGetterInput: GetBankAccountInput,
  ): Promise<BankAccount> {
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

  async findOneForTransfer(transferBalanceInput: TransferBalanceInput) {
    const { accountNumberTo, accountTypeTo, amount, emailTo } =
      transferBalanceInput;
    switch (accountTypeTo) {
      case EBankAccoutType.CHECKING:
        return await this.checkingAccountService.findOneForTranfer(
          transferBalanceInput,
        );

      case EBankAccoutType.SAVINGS:
      // const sav = await this.savingsAccountService.findOneById(id);
      // console.log({ sav });
      //return sav;

      default:
        throw new Error('Account type not found');
    }
  }

  async transferBalance(
    transferBalanceInput: TransferBalanceInput,
    userBankSetting: UserBankSetting,
  ) {
    const { accountTypeTo, amount, accountNumberTo, emailTo } =
      transferBalanceInput;
    const storedAccount = await this.findOneBankAccount({
      accountType: userBankSetting.bankAccountType,
      id: userBankSetting.bankAccount,
    });
    if (storedAccount.balance < amount) throw new Error('Insufficient funds');
    const accountTo = await this.findOneForTransfer({
      accountTypeTo,
      accountNumberTo,
      emailTo,
      amount,
    });
  }

  update(
    id: number,
    updateBankAccountGetterInput: UpdateBankAccountGetterInput,
  ) {
    return `This action updates a #${id} bankAccountGetter`;
  }
}
