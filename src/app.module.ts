import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { BankAccountsFactoryModule } from './bank-accounts-factory/bank-accounts-factory.module';
import { BankSettingsModule } from './bank-settings/bank-settings.module';
import { CheckingAccountModule } from './checking-account/checking-account.module';
import { SavingsAccountModule } from './savings-account/savings-account.module';
import { UserBankSettingsModule } from './user-bank-settings/user-bank-settings.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/sistema-bancario'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ footer: false }) as any,
      ],
    }),
    UserModule,
    AuthModule,
    BankSettingsModule,
    UserBankSettingsModule,
    CheckingAccountModule,
    SavingsAccountModule,
    BankAccountsFactoryModule,
    BankAccountModule,
  ],
  providers: [AppService],
})
export class AppModule {}
