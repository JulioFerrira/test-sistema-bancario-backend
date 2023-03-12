import { EBankAccoutType } from 'src/bank-accounts-factory/types/accounts-type-enum';

export interface BankAccount {
  balance: number;
  accountNumber: string;
  typeAccount: EBankAccoutType;
}
