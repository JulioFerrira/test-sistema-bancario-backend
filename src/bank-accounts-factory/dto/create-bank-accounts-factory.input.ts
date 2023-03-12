import { InputType } from '@nestjs/graphql';
import { BankAccountDto } from 'src/interfaces/bank-account.dto';
import { EBankAccoutType } from '../types/accounts-type-enum';

@InputType()
export class CreateBankAccountsFactoryInput implements BankAccountDto {
  balance: number;
  accountType: EBankAccoutType;
}
