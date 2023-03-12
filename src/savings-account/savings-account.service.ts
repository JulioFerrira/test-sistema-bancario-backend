import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { generateBankAccountNumber } from '../utils/generateBankNumer';
import { CreateSavingsAccountDto } from './dto/create-savings-account.dto';
import { SavingsAccount } from './schema/savings-account.schema';

@Injectable()
export class SavingsAccountService {
  constructor(
    @InjectModel(SavingsAccount.name)
    private readonly savingsAccountModel: Model<SavingsAccount>,
  ) {}
  async create(
    createSavingsAccountDto: CreateSavingsAccountDto,
  ): Promise<SavingsAccount> {
    const { balance } = createSavingsAccountDto;
    const bankAccountNumber = generateBankAccountNumber();
    const savingsAccount = await this.savingsAccountModel.create({
      balance,
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
}
