import { PartialType } from '@nestjs/mapped-types';
import { CreateManagerDto } from './create-manager.dto.js';

export class UpdateManagerDto extends PartialType(CreateManagerDto) {}
