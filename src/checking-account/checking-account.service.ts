import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { generateBankAccountNumber } from '../utils/generateBankNumer';
import { CreateCheckingAccountDto } from './dto/create-checking-account.dto';
import { CheckingAccount } from './schema/checking-account.entity';

@Injectable()
export class CheckingAccountService {
  constructor(
    @InjectModel(CheckingAccount.name)
    private readonly checkingAccountModel: Model<CheckingAccount>,
  ) {}

  async create(
    createCheckingAccountDto: CreateCheckingAccountDto,
  ): Promise<CheckingAccount> {
    const { balance } = createCheckingAccountDto;
    const bankAccountNumber = generateBankAccountNumber();
    return await this.checkingAccountModel.create({
      balance,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      accountNumber: bankAccountNumber,
    });
  }
}
