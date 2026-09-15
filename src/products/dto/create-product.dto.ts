import {IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsUUID("4")
    @IsString()
    @IsOptional()
    productId: string;
    @IsString() @MaxLength(100)
    productName: string;
    @IsNumber()
    price: number;
    @IsInt()
    countSeal: number;
    @IsUUID("4") @IsString()
    provider: string;
}
