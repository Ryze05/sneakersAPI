import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class QueryBrandDto {
    
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim().toLowerCase())
    name?: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if ([true, 'true', 1, '1'].includes(value)) return true;
        if ([false, 'false', 0, '0'].includes(value)) return false;

        return value;
    })
    isActive?: boolean;
}