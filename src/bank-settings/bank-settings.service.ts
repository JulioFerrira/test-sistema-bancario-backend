import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { CreateBankSettingInput } from './dto/create-bank-setting.input';
import { BankSetting } from './schema/bank-setting.schema';

@Injectable()
export class BankSettingsService {
  constructor(
    @InjectModel(BankSetting.name)
    private readonly bankSettingsModel: Model<BankSetting>,
  ) {}

  async create(createBankSettingInput: CreateBankSettingInput) {
    const { transferencePassword } = createBankSettingInput;
    const bankSettings = await this.bankSettingsModel.create({
      ...createBankSettingInput,
      transferencePassword: await bcrypt.hash(transferencePassword, 11),
      createdAt: new Date(),
      updatedAt: new Date(),
      id: uuid(),
    });
    return bankSettings;
  }

  async findOneById(id: number) {
    const storedBankSettigs = await this.bankSettingsModel.findOne({ id });
    if (!storedBankSettigs) throw new Error('Bank settings not found');
    return storedBankSettigs;
  }
}
