import { PaginationDto } from '~/dto/pagination.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class SearchDto extends PartialType(PaginationDto) {
    @ApiProperty({ description: '是否分页' })
    @IsOptional()
    @IsNumber()
    @IsIn([0, 1])
    pagination: number;
}
