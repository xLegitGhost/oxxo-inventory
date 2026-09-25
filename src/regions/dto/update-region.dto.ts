import { PartialType } from '@nestjs/mapped-types';
import { CreateRegionDto } from './create-region.dto.js';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {}
