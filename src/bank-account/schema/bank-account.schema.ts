import {
  Field,
  InputType,
  Int,
  InterfaceType,
  ObjectType,
} from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { EBankAccoutType } from '../../bank-accounts-factory/types/accounts-type-enum';
import { Base } from '../../shared/schema/base';
import { IBankAccount } from '../interfaces/bank-account';

@ObjectType('BankAccountObject', { implements: [Base] })
@InputType('BankAccountType')
@InterfaceType({
  resolveType: (value) => {
    const {
      SavingsAccount,
    } = require('../../savings-account/schema/savings-account.schema');
    const {
      CheckingAccount,
    } = require('../../checking-account/schema/checking-account.schema');
    switch (value.typeAccount) {
      case EBankAccoutType.SAVINGS:
        return SavingsAccount;
      case EBankAccoutType.CHECKING:
        return CheckingAccount;
      default:
        return BankAccount;
    }
  },
})
export abstract class BankAccount extends Base implements IBankAccount {
  @Field(() => Int)
  @Prop()
  balance: number;

  @Field(() => String)
  @Prop()
  accountNumber: string;

  @Field(() => EBankAccoutType)
  @Prop({ default: EBankAccoutType.UNKNOWN })
  typeAccount: EBankAccoutType;
}
