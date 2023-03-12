import { Field, InputType } from '@nestjs/graphql';
import { EBankAccoutType } from '../../bank-accounts-factory/types/accounts-type-enum';

@InputType()
export class GetBankAccountGetterInput {
  @Field(() => String)
  id: string;

  @Field(() => EBankAccoutType)
  accountType: EBankAccoutType;
}
