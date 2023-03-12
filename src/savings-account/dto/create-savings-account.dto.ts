import { BankAccountInput } from 'src/shared/dto/bank-acount.dto';

export class CreateSavingsAccountDto implements BankAccountInput {
  balance: number;
}
