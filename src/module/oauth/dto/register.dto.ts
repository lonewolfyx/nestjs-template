import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    // 用户名称
    @ApiProperty({ description: '用户名称' })
    @IsString()
    username: string;

    // 用户密码
    @ApiProperty({ description: '用户密码' })
    @IsString()
    @Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i)
    @MinLength(6)
    @MaxLength(16)
    password: string;

    // 手机号
    @ApiProperty({ description: '手机号' })
    phone?: number;

    // 邮箱
    @ApiProperty({ description: '邮箱' })
    email?: string;
}
