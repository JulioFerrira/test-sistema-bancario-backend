import { BankAccountInput } from 'src/shared/dto/bank-acount.dto';

export class CreateCheckingAccountDto implements BankAccountInput {
  balance: number;
}
