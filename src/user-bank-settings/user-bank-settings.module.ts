import { Module } from '@nestjs/common';
import { UserBankSettingsService } from './user-bank-settings.service';
import { UserBankSettingsController } from './user-bank-settings.controller';

@Module({
  controllers: [UserBankSettingsController],
  providers: [UserBankSettingsService]
})
export class UserBankSettingsModule {}
