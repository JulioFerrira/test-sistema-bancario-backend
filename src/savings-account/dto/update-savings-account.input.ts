import { PartialType } from '@nestjs/mapped-types';
import { CreateSavingsAccountInput } from './create-savings-account.input';

export class UpdateSavingsAccountInput extends PartialType(
  CreateSavingsAccountInput,
) {
  id: string;
}
