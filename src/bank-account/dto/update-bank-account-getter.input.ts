import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GetBankAccountInput } from './get-account.input';

@InputType()
export class UpdateBankAccountGetterInput extends PartialType(
  GetBankAccountInput,
) {
  @Field(() => String)
  id: string;
}
