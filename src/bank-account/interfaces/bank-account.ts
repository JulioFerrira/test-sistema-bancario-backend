import { EBankAccoutType } from 'src/bank-accounts-factory/types/accounts-type-enum';

export interface IBankAccount {
  balance: number;
  accountNumber: string;
  typeAccount: EBankAccoutType;
}
