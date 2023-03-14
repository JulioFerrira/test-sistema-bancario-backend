import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-core';
import { EBankAccoutType } from 'src/bank-accounts-factory/types/accounts-type-enum';
import { BankSettingsService } from '../bank-settings/bank-settings.service';
import { CheckingAccountService } from '../checking-account/checking-account.service';
import { SavingsAccountService } from '../savings-account/savings-account.service';
import { UserBankSetting } from '../user-bank-settings/schema/user-bank-setting.schema';
import { GetBankAccountInput } from './dto/get-account.input';
import { TransferBalanceInput } from './dto/transfer-balance-input';
import { UpdateBankAccountInput } from './dto/update-bank-account.input';
import { BankAccount } from './schema/bank-account.schema';

@Injectable()
export class BankAccountService {
  constructor(
    private readonly checkingAccountService: CheckingAccountService,
    private readonly savingsAccountService: SavingsAccountService,
    private readonly bankSettingsService: BankSettingsService,
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
    const { accountTypeTo } = transferBalanceInput;
    switch (accountTypeTo) {
      case EBankAccoutType.CHECKING:
        return await this.checkingAccountService.findOneForTranfer(
          transferBalanceInput,
        );

      case EBankAccoutType.SAVINGS:
        return await this.savingsAccountService.findOneForTranfer(
          transferBalanceInput,
        );

      default:
        throw new Error('Account type not found');
    }
  }

  async transferBalance(
    transferBalanceInput: TransferBalanceInput,
    userBankSetting: UserBankSetting,
  ): Promise<Boolean> {
    const { amount } = transferBalanceInput;
    const storedAccount = await this.findOneBankAccount({
      accountType: userBankSetting.bankAccountType,
      id: userBankSetting.bankAccount,
    });
    if (storedAccount.balance < amount)
      throw new UserInputError('Insufficient funds');

    await this.findOneForTransfer(transferBalanceInput);
    await this.updateBankAccount({
      accountType: userBankSetting.bankAccountType,
      id: userBankSetting.bankAccount,
      balance: storedAccount.balance - amount,
    });
    return true;
  }

  // async transferBalanceToContact(getBankAccountInput: GetBankAccountInput) {
  //   const { accountType, id } = getBankAccountInput;
  //   switch (accountType) {
  //     case EBankAccoutType.CHECKING:
  //       return await this.checkingAccountService.findOneContactForTranfer(
  //         getBankAccountInput,
  //       );

  //     case EBankAccoutType.SAVINGS:
  //       return await this.savingsAccountService.findOneContactForTranfer(
  //         getBankAccountInput,
  //       );

  //     default:
  //       throw new Error('Account type not found');
  //   }
  // }

  async updateBankAccount(
    updateBankAccountInput: UpdateBankAccountInput,
  ): Promise<BankAccount> {
    const { accountType } = updateBankAccountInput;
    switch (accountType) {
      case EBankAccoutType.CHECKING:
        return await this.checkingAccountService.updateAccount(
          updateBankAccountInput,
        );

      case EBankAccoutType.SAVINGS:
        return await this.savingsAccountService.updateAccount(
          updateBankAccountInput,
        );

      default:
        throw new Error('Account type not found');
    }
  }
}
