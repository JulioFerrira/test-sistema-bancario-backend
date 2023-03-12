import { Field, InputType } from '@nestjs/graphql';
import { BankAccountInput } from 'src/shared/dto/bank-acount.dto';
import { EBankAccoutType } from '../types/accounts-type-enum';

@InputType('CreateBankAccountsFactoryInputType')
export class CreateBankAccountsFactoryInput implements BankAccountInput {
  @Field()
  balance: number;

  @Field(() => EBankAccoutType)
  accountType: EBankAccoutType;
}
