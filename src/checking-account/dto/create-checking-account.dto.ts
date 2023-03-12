import { BankAccountDto } from 'src/interfaces/bank-account.dto';

export class CreateCheckingAccountDto implements BankAccountDto {
  balance: number;
}
