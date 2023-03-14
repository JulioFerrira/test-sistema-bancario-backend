import { BankAccountInput } from 'src/bank-account/dto/bank-acount.dto';

export class CreateCheckingAccountDto implements BankAccountInput {
  balance: number;
}
