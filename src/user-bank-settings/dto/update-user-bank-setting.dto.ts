import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBankSettingDto } from './create-user-bank-setting.dto';

export class UpdateUserBankSettingDto extends PartialType(CreateUserBankSettingDto) {}
