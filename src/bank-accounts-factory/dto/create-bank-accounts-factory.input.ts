import { Field, InputType } from '@nestjs/graphql';
import { BankAccountDto } from 'src/interfaces/bank-account.dto';
import { EBankAccoutType } from '../types/accounts-type-enum';

@InputType('CreateBankAccountsFactoryInputType')
export class CreateBankAccountsFactoryInput implements BankAccountDto {
  @Field()
  balance: number;

  @Field(() => EBankAccoutType)
  accountType: EBankAccoutType;
}
