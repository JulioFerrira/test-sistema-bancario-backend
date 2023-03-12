import { Field, InputType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { CreateBankAccountsFactoryInput } from '../../bank-accounts-factory/dto/create-bank-accounts-factory.input';
import { CreateBankSettingInput } from '../../bank-settings/dto/create-bank-setting.input';

@InputType('CreateUserBankSettingInputType')
export class CreateUserBankSettingInput {
  @Field(() => CreateUserInput)
  userInput: CreateUserInput;

  @Field(() => CreateBankSettingInput)
  bankSettingInput: CreateBankSettingInput;

  @Field(() => CreateBankAccountsFactoryInput)
  createBankAccountsFactoryInput: CreateBankAccountsFactoryInput;
}
