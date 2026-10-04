import { PartialType } from '@nestjs/swagger';
import { CreateManagerDto } from './create-manager.dto.js';

export class UpdateManagerDto extends PartialType(CreateManagerDto) {}
