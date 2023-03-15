import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-core';
import * as bcrypt from 'bcrypt';
import { EBankAccoutType } from 'src/bank-accounts-factory/types/accounts-type-enum';
import { BankSettingsService } from '../bank-settings/bank-settings.service';
import { CheckingAccountService } from '../checking-account/checking-account.service';
import { SavingsAccountService } from '../savings-account/savings-account.service';
import { UserBankSetting } from '../user-bank-settings/schema/user-bank-setting.schema';
import { DepositBalanceInput } from './dto/deposit-balance.input';
import { GetBankAccountInput } from './dto/get-account.input';
import { TransferBalanceContactInput } from './dto/transfer-balance-contact.input';
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

  async transferBalance(
    transferBalanceInput: TransferBalanceInput,
    userBankSetting: UserBankSetting,
  ): Promise<Boolean> {
    const { amount } = transferBalanceInput;
    await this.validatePassword(
      userBankSetting.bankSetting,
      transferBalanceInput.transferencePassword,
    );
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

  async transferBalanceToContact(
    transferBalanceContactInput: TransferBalanceContactInput,
    userBankSetting: UserBankSetting,
  ): Promise<Boolean> {
    const { amount } = transferBalanceContactInput;
    await this.validatePassword(
      userBankSetting.bankSetting,
      transferBalanceContactInput.transferencePassword,
    );
    const storedAccount = await this.findOneBankAccount({
      accountType: userBankSetting.bankAccountType,
      id: userBankSetting.bankAccount,
    });
    if (storedAccount.balance < amount)
      throw new UserInputError('Insufficient funds');
    await this.findOneForTransferContact(transferBalanceContactInput);
    await this.updateBankAccount({
      accountType: userBankSetting.bankAccountType,
      id: userBankSetting.bankAccount,
      balance: storedAccount.balance - amount,
    });
    return true;
  }

  async depositBalance(
    depositBalanceInput: DepositBalanceInput,
    userBankSetting: UserBankSetting,
  ): Promise<Boolean> {
    await this.validatePassword(
      userBankSetting.bankSetting,
      depositBalanceInput.transferencePassword,
    );
    await this.findOneForDeposit(depositBalanceInput);
    return true;
  }

  private async findOneForTransfer(transferBalanceInput: TransferBalanceInput) {
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

  private async findOneForTransferContact(
    transferBalanceContactInput: TransferBalanceContactInput,
  ): Promise<BankAccount> {
    const { accountTypeTo } = transferBalanceContactInput;
    switch (accountTypeTo) {
      case EBankAccoutType.CHECKING:
        return await this.checkingAccountService.findOneContactForTranfer(
          transferBalanceContactInput,
        );

      case EBankAccoutType.SAVINGS:
        return await this.savingsAccountService.findOneContactForTranfer(
          transferBalanceContactInput,
        );

      default:
        throw new Error('Account type not found');
    }
  }

  private async findOneForDeposit(
    depositBalanceInput: DepositBalanceInput,
  ): Promise<BankAccount> {
    const { accountTypeTo } = depositBalanceInput;
    switch (accountTypeTo) {
      case EBankAccoutType.CHECKING:
        return await this.checkingAccountService.findOneForDeposit(
          depositBalanceInput,
        );
      case EBankAccoutType.SAVINGS:
        return await this.savingsAccountService.findOneForDeposit(
          depositBalanceInput,
        );
      default:
        throw new Error('Account type not found');
    }
  }

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
  private async validatePassword(
    bankSettingId: string,
    password: string,
  ): Promise<boolean> {
    const storedBankSetting = await this.bankSettingsService.findOneById(
      bankSettingId,
    );
    if (!bcrypt.compareSync(password, storedBankSetting.transferencePassword)) {
      throw new UserInputError('Wrong password');
    }
    return true;
  }
}
