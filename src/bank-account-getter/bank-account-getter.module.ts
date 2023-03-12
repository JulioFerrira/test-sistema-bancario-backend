import { Module } from '@nestjs/common';
import { CheckingAccountModule } from '../checking-account/checking-account.module';
import { SavingsAccountModule } from '../savings-account/savings-account.module';
import { BankAccountGetterResolver } from './bank-account-getter.resolver';
import { BankAccountGetterService } from './bank-account-getter.service';

@Module({
  imports: [SavingsAccountModule, CheckingAccountModule],
  providers: [BankAccountGetterResolver, BankAccountGetterService],
  exports: [BankAccountGetterService],
})
export class BankAccountGetterModule {}
