import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BankAccount } from '../../bank-account/schema/bank-account.schema';
import { EBankAccoutType } from '../../bank-accounts-factory/types/accounts-type-enum';

@Schema()
@ObjectType({ implements: [BankAccount] })
@InputType('SavingsAccountType')
export class SavingsAccount extends BankAccount {
  @Field(() => EBankAccoutType)
  @Prop({ default: EBankAccoutType.SAVINGS })
  typeAccount: EBankAccoutType.SAVINGS;

  @Field(() => Number)
  @Prop({ default: 0.05 })
  interestRate: number;
}

export const SavingsAccountSchema =
  SchemaFactory.createForClass(SavingsAccount);
