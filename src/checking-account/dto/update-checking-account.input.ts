import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckingAccountInput } from './create-checking-account.input';

export class UpdateCheckingAccountInput extends PartialType(
  CreateCheckingAccountInput,
) {
  id: string;
}
