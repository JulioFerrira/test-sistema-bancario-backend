import { BankAccountInput } from 'src/bank-account/dto/bank-acount.dto';

export class CreateSavingsAccountDto implements BankAccountInput {
  balance: number;
}
