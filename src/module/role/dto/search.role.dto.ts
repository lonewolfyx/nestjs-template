import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from '~/dto/pagination.dto';
import { CreateRoleDto } from '~/module/role/dto/create.role.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class SearchRoleDto extends IntersectionType(PartialType(CreateRoleDto), PartialType(PaginationDto)) {

    @ApiProperty({ description: '是否分页' })
    @IsOptional()
    @IsNumber()
    @IsIn([0, 1],{message:'参数错误'})
    pagination: number;
}