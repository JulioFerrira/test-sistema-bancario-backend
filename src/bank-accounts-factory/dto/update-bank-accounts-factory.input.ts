import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBankAccountsFactoryInput } from './create-bank-accounts-factory.input';

@InputType()
export class UpdateBankAccountsFactoryInput extends PartialType(
  CreateBankAccountsFactoryInput,
) {}
