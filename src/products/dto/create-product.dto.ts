import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Provider } from '../../providers/entities/provider.entity.js';

export class CreateProductDto {
  @ApiPropertyOptional()
  @IsUUID('4')
  @IsString()
  @IsOptional()
  productId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  productName: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsInt()
  countSeal: number;

  @ApiProperty()
  @IsObject()
  provider: Provider;
}
