import { Field, InputType } from '@nestjs/graphql';
import { BankAccountInput } from 'src/bank-account/dto/bank-acount.dto';
import { EBankAccoutType } from '../types/accounts-type-enum';

@InputType('CreateBankAccountsFactoryInputType')
export class CreateBankAccountsFactoryInput implements BankAccountInput {
  @Field()
  balance: number;

  @Field(() => EBankAccoutType)
  accountType: EBankAccoutType;

  @Field({ nullable: true })
  interestRate: number;

  @Field({ nullable: true })
  moneyOutcomes: number;
}
