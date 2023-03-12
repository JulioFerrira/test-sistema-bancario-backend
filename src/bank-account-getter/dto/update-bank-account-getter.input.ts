import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GetBankAccountGetterInput } from './get-account.input';

@InputType()
export class UpdateBankAccountGetterInput extends PartialType(
  GetBankAccountGetterInput,
) {
  @Field(() => String)
  id: string;
}
