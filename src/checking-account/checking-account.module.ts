import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckingAccountService } from './checking-account.service';
import {
  CheckingAccount,
  CheckingAccountSchema,
} from './schema/checking-account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CheckingAccount.name, schema: CheckingAccountSchema },
    ]),
  ],
  providers: [CheckingAccountService],

  exports: [CheckingAccountService],
})
export class CheckingAccountModule {}
