import { BankAccountInput } from 'src/bank-account/dto/bank-acount.input';
import { EBankAccoutType } from '../../bank-accounts-factory/types/accounts-type-enum';

export class CreateCheckingAccountInput implements BankAccountInput {
  balance: number;
  interestRate: number;
  accountType: EBankAccoutType;
  bankName: string;
}
