import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({ description: '角色名称' })
    @IsString()
    role_name: string;

    @ApiProperty({ description: '角色编码' })
    @IsString()
    role_code: string;

    @ApiProperty({ description: '角色描述' })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ description: '角色状态' })
    @IsIn([0, 1])
    status: number;
}