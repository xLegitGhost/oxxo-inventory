import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProviderDto {
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    providerName: string;

    @ApiProperty()
    @IsEmail()
    @IsString()
    providerEmail: string;

    @ApiPropertyOptional()
    @IsString()
    @MaxLength(15)
    @IsOptional()
    providerPhoneNumber?: string;
}
