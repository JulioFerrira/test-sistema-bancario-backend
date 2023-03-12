import { Module } from '@nestjs/common';
import { BankSettingsService } from './bank-settings.service';
import { BankSettingsResolver } from './bank-settings.resolver';

@Module({
  providers: [BankSettingsResolver, BankSettingsService]
})
export class BankSettingsModule {}
