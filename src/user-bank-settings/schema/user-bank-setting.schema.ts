import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BankAccount } from '../../bank-account/schema/bank-account.schema';
import { EBankAccoutType } from '../../bank-accounts-factory/types/accounts-type-enum';
import { BankSetting } from '../../bank-settings/schema/bank-setting.schema';
import { Base } from '../../shared/schema/base';
import { User } from '../../user/schema/user.schema';

@ObjectType({ implements: [Base] })
@Schema()
@InputType('UserBankSettingType')
export class UserBankSetting extends Base {
  @Field(() => User)
  @Prop()
  user: string;

  @Field(() => BankSetting)
  @Prop()
  bankSetting: string;

  @Field(() => BankAccount)
  @Prop()
  bankAccount: string;

  @Field(() => EBankAccoutType)
  @Prop()
  bankAccountType: EBankAccoutType;
}

export const UserBankSettingSchema =
  SchemaFactory.createForClass(UserBankSetting);
