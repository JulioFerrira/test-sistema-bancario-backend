import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckingAccountDto } from './create-checking-account.dto';

export class UpdateCheckingAccountDto extends PartialType(CreateCheckingAccountDto) {}
