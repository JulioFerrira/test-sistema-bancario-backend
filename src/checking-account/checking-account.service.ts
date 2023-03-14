import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { TransferBalanceInput } from '../bank-account/dto/transfer-balance-input';
import { UpdateBankAccountInput } from '../bank-account/dto/update-bank-account.input';
import { generateBankAccountNumber } from '../utils/generateBankNumer';
import { CreateCheckingAccountInput } from './dto/create-checking-account.input';
import { CheckingAccount } from './schema/checking-account.schema';

@Injectable()
export class CheckingAccountService {
  constructor(
    @InjectModel(CheckingAccount.name)
    private readonly checkingAccountModel: Model<CheckingAccount>,
  ) {}

  async create(
    CreateCheckingAccountInput: CreateCheckingAccountInput,
  ): Promise<CheckingAccount> {
    const bankAccountNumber = generateBankAccountNumber();
    const checkingAccount = await this.checkingAccountModel.create({
      ...CreateCheckingAccountInput,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      accountNumber: bankAccountNumber,
    });
    return checkingAccount;
  }

  async findOneById(id: string): Promise<CheckingAccount> {
    const storedCheckingAccount = await this.checkingAccountModel.findOne({
      id,
    });
    if (!storedCheckingAccount) throw new Error('Checking account not found');
    return storedCheckingAccount;
  }

  async updateAccount(updateCheckingAccountInput: UpdateBankAccountInput) {
    const { id } = updateCheckingAccountInput;
    return await this.checkingAccountModel.findOneAndUpdate(
      {
        id,
      },
      updateCheckingAccountInput,
      { new: true },
    );
  }

  async findOneForTranfer(transferBalanceInput: TransferBalanceInput) {
    console.log({ emailTo: transferBalanceInput.emailTo });
    const storedCheckingAccount = await this.checkingAccountModel.findOne({
      accountNumber: transferBalanceInput.accountNumberTo,
      bankName: transferBalanceInput.bankNameTo,
      typeAccount: transferBalanceInput.accountTypeTo,
    });
    if (!storedCheckingAccount) throw new Error('Checking account not found');
    storedCheckingAccount.balance += transferBalanceInput.amount;
    storedCheckingAccount.save();
    return storedCheckingAccount;
  }

  async findOneContactForTranfer(transferBalanceInput: TransferBalanceInput) {
    const id = '';
    const storedCheckingAccount = await this.checkingAccountModel.findOne({
      id,
    });
    if (!storedCheckingAccount) throw new Error('Checking account not found');
    storedCheckingAccount.balance += transferBalanceInput.amount;
    storedCheckingAccount.save();
    return storedCheckingAccount;
  }
}
