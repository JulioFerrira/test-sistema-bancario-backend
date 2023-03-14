import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BankAccount } from '../../bank-account/schema/bank-account.schema';
import { EBankAccoutType } from '../../bank-accounts-factory/types/accounts-type-enum';

@Schema()
@ObjectType({ implements: [BankAccount] })
@InputType('CheckingAccountType')
export class CheckingAccount extends BankAccount {
  @Field(() => EBankAccoutType)
  @Prop({ default: EBankAccoutType.CHECKING })
  typeAccount: EBankAccoutType.CHECKING;

  @Field(() => Int, { nullable: true })
  @Prop()
  transferenceCost: number;
}

export const CheckingAccountSchema =
  SchemaFactory.createForClass(CheckingAccount);
