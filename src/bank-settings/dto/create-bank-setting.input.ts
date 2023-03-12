import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateBankSettingInputType')
export class CreateBankSettingInput {
  @Field(() => String)
  transferencePassword: string;

  @Field(() => String)
  bankName: string;

  @Field(() => [String], { nullable: true })
  contact: string[];
}
