import { registerEnumType } from '@nestjs/graphql';

export enum EBankAccoutType {
  SAVINGS = 'SAVINGS',
  CHECKING = 'CHECKING',
}

registerEnumType(EBankAccoutType, {
  name: 'EBankAccoutType',
  description: 'Bank account type',
});
