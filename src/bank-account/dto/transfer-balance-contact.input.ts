import { Field, InputType, Int } from '@nestjs/graphql';
import { EBankAccoutType } from '../../bank-accounts-factory/types/accounts-type-enum';

@InputType()
export class TransferBalanceContactInput {
  @Field(() => EBankAccoutType)
  accountTypeTo: EBankAccoutType;

  @Field(() => String)
  accountIdTo: string;

  @Field(() => Int)
  amount: number;

  @Field(() => String)
  transferencePassword: string;
}
