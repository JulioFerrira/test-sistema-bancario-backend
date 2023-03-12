import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { EBankAccoutType } from '../../bank-accounts-factory/types/accounts-type-enum';
import { BankAccount } from '../interfaces/bank-account';
import { Base } from '../schema/base';
@InputType('BankAccountType')
@ObjectType()
export abstract class BankAccountAC extends Base implements BankAccount {
  @Field()
  balance: number;

  @Field()
  accountNumber: string;

  @Field()
  typeAccount: EBankAccoutType;
}
