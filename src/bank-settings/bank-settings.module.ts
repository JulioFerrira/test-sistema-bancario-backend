import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankSettingsResolver } from './bank-settings.resolver';
import { BankSettingsService } from './bank-settings.service';
import { BankSetting, BankSettingSchema } from './schema/bank-setting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BankSetting.name, schema: BankSettingSchema },
    ]),
  ],
  providers: [BankSettingsService, BankSettingsResolver],
  exports: [BankSettingsService],
})
export class BankSettingsModule {}
