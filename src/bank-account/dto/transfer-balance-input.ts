import { Field, InputType, Int } from '@nestjs/graphql';
import { EBankAccoutType } from '../../bank-accounts-factory/types/accounts-type-enum';

@InputType()
export class TransferBalanceInput {
  @Field(() => EBankAccoutType)
  accountTypeTo: EBankAccoutType;

  @Field(() => String)
  accountNumberTo: string;

  @Field(() => String)
  bankNameTo: string;

  @Field(() => String)
  emailTo: string;

  @Field(() => Int)
  amount: number;
}
