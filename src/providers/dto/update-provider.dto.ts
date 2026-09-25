import { PartialType } from '@nestjs/mapped-types';
import { CreateProviderDto } from './create-provider.dto.js';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
