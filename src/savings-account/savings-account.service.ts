import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { DepositBalanceInput } from '../bank-account/dto/deposit-balance.input';
import { TransferBalanceContactInput } from '../bank-account/dto/transfer-balance-contact.input';
import { TransferBalanceInput } from '../bank-account/dto/transfer-balance-input';
import { generateBankAccountNumber } from '../utils/generateBankNumer';
import { CreateSavingsAccountInput } from './dto/create-savings-account.input';
import { UpdateSavingsAccountInput } from './dto/update-savings-account.input';
import { SavingsAccount } from './schema/savings-account.schema';

@Injectable()
export class SavingsAccountService {
  constructor(
    @InjectModel(SavingsAccount.name)
    private readonly savingsAccountModel: Model<SavingsAccount>,
  ) {}
  async create(
    CreateSavingsAccountInput: CreateSavingsAccountInput,
  ): Promise<SavingsAccount> {
    const bankAccountNumber = generateBankAccountNumber();
    const savingsAccount = await this.savingsAccountModel.create({
      ...CreateSavingsAccountInput,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      accountNumber: bankAccountNumber,
    });
    return savingsAccount;
  }

  async findOneById(id: string): Promise<SavingsAccount> {
    const storedSavingsAccount = await this.savingsAccountModel.findOne({
      id,
    });
    if (!storedSavingsAccount) throw new Error('Savings account not found');
    return storedSavingsAccount;
  }

  async updateAccount(updateSavingsAccountInput: UpdateSavingsAccountInput) {
    const { id } = updateSavingsAccountInput;
    return await this.savingsAccountModel.findOneAndUpdate(
      {
        id,
      },
      UpdateSavingsAccountInput,
      { new: true },
    );
  }

  async findOneForTranfer(transferBalanceInput: TransferBalanceInput) {
    console.log({ emailTo: transferBalanceInput.emailTo });
    const storedSavingsAccount = await this.savingsAccountModel.findOne({
      accountNumber: transferBalanceInput.accountNumberTo,
      bankName: transferBalanceInput.bankNameTo,
      typeAccount: transferBalanceInput.accountTypeTo,
    });
    if (!storedSavingsAccount) throw new Error('Savings account not found');
    storedSavingsAccount.balance += transferBalanceInput.amount;
    storedSavingsAccount.save();
    return storedSavingsAccount;
  }

  async findOneContactForTranfer(
    transferBalanceContactInput: TransferBalanceContactInput,
  ) {
    const { accountIdTo } = transferBalanceContactInput;
    const storedSavingsAccount = await this.savingsAccountModel.findOne({
      id: accountIdTo,
    });
    if (!storedSavingsAccount) throw new Error('Savings account not found');
    storedSavingsAccount.balance += transferBalanceContactInput.amount;
    storedSavingsAccount.save();
    return storedSavingsAccount;
  }

  async findOneForDeposit(depositBalanceInput: DepositBalanceInput) {
    const { accountIdTo, amount } = depositBalanceInput;
    const storedSavingsAccount = await this.savingsAccountModel.findOne({
      id: accountIdTo,
    });
    if (!storedSavingsAccount) throw new Error('Savings account not found');
    storedSavingsAccount.balance += amount;
    storedSavingsAccount.save();
    return storedSavingsAccount;
  }
}
