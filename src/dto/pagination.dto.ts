import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class PaginationDto {
    @ApiProperty({ description: '页码' })
    @IsInt()
    page?: number = 1;

    @ApiProperty({ description: '每页数量' })
    @IsInt()
    limit?: number = 20;
}
