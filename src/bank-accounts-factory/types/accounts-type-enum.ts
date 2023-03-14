import { registerEnumType } from '@nestjs/graphql';

export enum EBankAccoutType {
  SAVINGS = 'SAVINGS',
  CHECKING = 'CHECKING',
  UNKNOWN = 'UNKNOWN',
}

registerEnumType(EBankAccoutType, {
  name: 'EBankAccoutType',
  description: 'Bank account type',
});
