import { EBankAccoutType } from '../../bank-accounts-factory/types/accounts-type-enum';
import { BankAccount } from '../schema/bank-account.schema';

export interface IValidateAccounType {
  accountType: EBankAccoutType;
  action: () => BankAccount;
}
