import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BankSetting } from '../../bank-settings/schema/bank-setting.schema';
import { BankAccountAC } from '../../interfaces/bank-account';
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

  @Field(() => BankAccountAC)
  @Prop()
  bankAccount: string;
}

export const UserBankSettingSchema =
  SchemaFactory.createForClass(UserBankSetting);
