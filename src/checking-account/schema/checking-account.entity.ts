import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BankAccount } from 'src/shared/interfaces/bank-account';
import { EBankAccoutType } from '../../bank-accounts-factory/types/accounts-type-enum';
import { Base } from '../../shared/schema/base';

@ObjectType({ implements: [Base] })
@Schema()
@InputType('CheckingAccountType')
export class CheckingAccount extends Base implements BankAccount {
  @Field(() => String)
  @Prop()
  balance: number;

  @Field(() => String)
  @Prop()
  accountNumber: string;

  @Field(() => EBankAccoutType)
  @Prop({ default: EBankAccoutType.CHECKING })
  typeAccount: EBankAccoutType.CHECKING;
}

export const CheckingAccountSchema =
  SchemaFactory.createForClass(CheckingAccount);
