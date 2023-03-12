import { Injectable } from '@nestjs/common';
import { CreateBankSettingInput } from './dto/create-bank-setting.input';
import { UpdateBankSettingInput } from './dto/update-bank-setting.input';

@Injectable()
export class BankSettingsService {
  create(createBankSettingInput: CreateBankSettingInput) {
    return 'This action adds a new bankSetting';
  }

  findAll() {
    return `This action returns all bankSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankSetting`;
  }

  update(id: number, updateBankSettingInput: UpdateBankSettingInput) {
    return `This action updates a #${id} bankSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankSetting`;
  }
}
