import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BankAccount } from 'src/interfaces/bank-account';
import { Base } from '../../shared/schema/base';

@ObjectType({ implements: [Base] })
@Schema()
@InputType('SavingsAccountType')
export class SavingsAccount extends Base implements BankAccount {
  @Field(() => String)
  @Prop()
  balance: number;

  @Field(() => String)
  @Prop()
  accountNumber: string;
}

export const SavingsAccountSchema =
  SchemaFactory.createForClass(SavingsAccount);
