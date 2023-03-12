import { Field, InputType, ObjectType } from '@nestjs/graphql';

export interface BankAccount {
  balance: number;
  accountNumber: string;
}

@InputType('BankAccountType')
@ObjectType()
export abstract class BankAccountAC implements BankAccount {
  @Field()
  balance: number;

  @Field()
  accountNumber: string;
}
