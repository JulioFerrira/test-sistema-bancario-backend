import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankAccountModule } from 'src/bank-account/bank-account.module';
import { BankAccountsFactoryModule } from '../bank-accounts-factory/bank-accounts-factory.module';
import { BankSettingsModule } from '../bank-settings/bank-settings.module';
import { UserModule } from '../user/user.module';
import {
  UserBankSetting,
  UserBankSettingSchema,
} from './schema/user-bank-setting.schema';
import { UserBankSettingsResolver } from './user-bank-settings.resolver';
import { UserBankSettingsService } from './user-bank-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserBankSetting.name, schema: UserBankSettingSchema },
    ]),
    BankAccountsFactoryModule,
    UserModule,
    BankSettingsModule,
    BankAccountModule,
  ],
  providers: [UserBankSettingsService, UserBankSettingsResolver],
  exports: [UserBankSettingsService],
})
export class UserBankSettingsModule {}
