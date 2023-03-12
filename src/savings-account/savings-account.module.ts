import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SavingsAccountService } from './savings-account.service';
import {
  SavingsAccount,
  SavingsAccountSchema,
} from './schema/savings-account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SavingsAccount.name, schema: SavingsAccountSchema },
    ]),
  ],
  providers: [SavingsAccountService],
  exports: [SavingsAccountService],
})
export class SavingsAccountModule {}
