import { PartialType } from '@nestjs/mapped-types';
import { CreateSavingsAccountDto } from './create-savings-account.dto';

export class UpdateSavingsAccountDto extends PartialType(CreateSavingsAccountDto) {}
