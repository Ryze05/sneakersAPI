import { Transform } from "class-transformer";
import { IsLowercase, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim().toLowerCase())
    name!: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim().toLowerCase())
    description?: string
}
