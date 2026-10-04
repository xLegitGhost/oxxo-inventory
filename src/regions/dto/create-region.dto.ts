import { IsArray, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRegionDto {
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    regionName: string;

    @ApiProperty()
    @IsArray()
    regionStates: string[];
}
