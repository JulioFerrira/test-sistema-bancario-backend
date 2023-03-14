import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from 'src/shared/schema/base';
import { UserBankSetting } from '../../user-bank-settings/schema/user-bank-setting.schema';

@ObjectType({ implements: [Base] })
@InputType('BankSettingType')
@Schema()
export class BankSetting extends Base {
  @Field(() => String)
  @Prop()
  transferencePassword: string;

  @Field(() => [UserBankSetting])
  @Prop()
  contacts: string[];
}

export const BankSettingSchema = SchemaFactory.createForClass(BankSetting);
