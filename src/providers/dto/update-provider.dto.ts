import { PartialType } from '@nestjs/swagger';
import { CreateProviderDto } from './create-provider.dto.js';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
