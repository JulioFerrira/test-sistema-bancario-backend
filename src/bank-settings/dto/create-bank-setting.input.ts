import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBankSettingInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
