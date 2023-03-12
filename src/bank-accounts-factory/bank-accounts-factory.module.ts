import { Module } from '@nestjs/common';
import { CheckingAccountModule } from '../checking-account/checking-account.module';
import { SavingsAccountModule } from '../savings-account/savings-account.module';
import { BankAccountsFactoryService } from './bank-accounts-factory.service';

@Module({
  imports: [CheckingAccountModule, SavingsAccountModule],
  providers: [BankAccountsFactoryService],
  exports: [
    BankAccountsFactoryService,
    CheckingAccountModule,
    SavingsAccountModule,
  ],
})
export class BankAccountsFactoryModule {}
