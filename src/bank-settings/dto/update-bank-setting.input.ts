import { CreateBankSettingInput } from './create-bank-setting.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBankSettingInput extends PartialType(CreateBankSettingInput) {
  @Field(() => Int)
  id: number;
}
