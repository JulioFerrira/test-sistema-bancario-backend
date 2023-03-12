import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from 'src/shared/schema/base';
import { User } from '../../user/schema/user.schema';

@ObjectType({ implements: [Base] })
@InputType('BankSettingType')
@Schema()
export class BankSetting extends Base {
  @Field(() => String)
  @Prop()
  transferencePassword: string;

  @Field(() => String)
  @Prop()
  accountNumber: string;

  @Field(() => String)
  @Prop()
  bankName: string;

  @Field(() => [User])
  @Prop()
  contacts: string;
}

export const BankSettingSchema = SchemaFactory.createForClass(User);
