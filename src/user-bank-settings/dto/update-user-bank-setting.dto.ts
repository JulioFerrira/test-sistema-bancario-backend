import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBankSettingInput } from './create-user-bank-setting.dto';

export class UpdateUserBankSettingDto extends PartialType(
  CreateUserBankSettingInput,
) {}
