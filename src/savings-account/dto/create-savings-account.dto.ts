import { BankAccountDto } from 'src/interfaces/bank-account.dto';

export class CreateSavingsAccountDto implements BankAccountDto {
  balance: number;
}
