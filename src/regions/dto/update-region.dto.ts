import { PartialType } from '@nestjs/swagger';
import { CreateRegionDto } from './create-region.dto.js';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {}
