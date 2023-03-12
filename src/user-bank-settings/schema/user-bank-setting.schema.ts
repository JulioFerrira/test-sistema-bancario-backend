import { InputType, ObjectType } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';
import { Base } from '../../shared/schema/base';

@ObjectType({ implements: [Base] })
@Schema()
@InputType('UserBankSettingType')
export class UserBankSetting {}
