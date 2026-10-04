import { IsString, MaxLength, IsArray, ArrayNotEmpty, IsOptional, IsObject } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Region } from "../../regions/entities/region.entity.js";

export class CreateLocationDto {
    @ApiProperty({ default: "Ocso Juriquilla" })
    @IsString()
    @MaxLength(35)
    locationName: string;

    @ApiProperty({ default: "Avenida tal número 76 220" })
    @IsString()
    @MaxLength(255)
    locationAddress: string;

    @ApiProperty({ default: [12, 12] })
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    region?: Region;
}
