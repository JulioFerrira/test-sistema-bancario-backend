import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { GetBankAccountInput } from './get-account.input';

@InputType()
export class UpdateBankAccountInput extends PartialType(GetBankAccountInput) {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  balance: number;
}
