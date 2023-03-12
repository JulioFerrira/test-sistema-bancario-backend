import { Injectable } from '@nestjs/common';
import { CreateUserBankSettingDto } from './dto/create-user-bank-setting.dto';
import { UpdateUserBankSettingDto } from './dto/update-user-bank-setting.dto';

@Injectable()
export class UserBankSettingsService {
  create(createUserBankSettingDto: CreateUserBankSettingDto) {
    return 'This action adds a new userBankSetting';
  }

  findAll() {
    return `This action returns all userBankSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userBankSetting`;
  }

  update(id: number, updateUserBankSettingDto: UpdateUserBankSettingDto) {
    return `This action updates a #${id} userBankSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBankSetting`;
  }
}
