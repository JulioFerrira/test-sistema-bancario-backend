import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { TransferBalanceInput } from '../bank-account/dto/transfer-balance-input';
import { generateBankAccountNumber } from '../utils/generateBankNumer';
import { CreateCheckingAccountDto } from './dto/create-checking-account.dto';
import { CheckingAccount } from './schema/checking-account.schema';

@Injectable()
export class CheckingAccountService {
  constructor(
    @InjectModel(CheckingAccount.name)
    private readonly checkingAccountModel: Model<CheckingAccount>,
  ) {}

  async create(
    createCheckingAccountDto: CreateCheckingAccountDto,
  ): Promise<CheckingAccount> {
    const bankAccountNumber = generateBankAccountNumber();
    const checkingAccount = await this.checkingAccountModel.create({
      ...createCheckingAccountDto,
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

  async findOneForTranfer(transferBalanceInput: TransferBalanceInput) {
    const storedCheckingAccount = await this.checkingAccountModel.findOne({
      accountNumber: transferBalanceInput.accountNumberTo,
    });
  }
}
