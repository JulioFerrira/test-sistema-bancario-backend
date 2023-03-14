import { Module } from '@nestjs/common';
import { BankSettingsModule } from '../bank-settings/bank-settings.module';
import { CheckingAccountModule } from '../checking-account/checking-account.module';
import { SavingsAccountModule } from '../savings-account/savings-account.module';
import { BankAccountResolver } from './bank-account.resolver';
import { BankAccountService } from './bank-account.service';

@Module({
  imports: [SavingsAccountModule, CheckingAccountModule, BankSettingsModule],
  providers: [BankAccountResolver, BankAccountService],
  exports: [BankAccountService],
})
export class BankAccountModule {}
