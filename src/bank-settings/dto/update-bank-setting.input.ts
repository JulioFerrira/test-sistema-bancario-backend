import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateBankSettingInput } from './create-bank-setting.input';

@InputType()
export class UpdateBankSettingInput extends PartialType(
  CreateBankSettingInput,
) {
  @Field(() => String)
  id: string;
}
