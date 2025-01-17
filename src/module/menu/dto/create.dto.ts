import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDto {
    @ApiProperty({ description: '父级菜单ID' })
    @IsString()
    parent_id: number | bigint;

    @ApiProperty({ description: '菜单名称' })
    menu_name: string;

    @ApiProperty({ description: '排序' })
    @IsNumber()
    order: number;

    @ApiProperty({ description: '菜单类型' })
    @IsString()
    @IsIn(['menu', 'children'], { message: '数据值错误' })
    menu_type: string;

    @ApiProperty({ description: '菜单图标' })
    menu_icon?: string;

    @ApiProperty({ description: '路由地址' })
    @IsNotEmpty()
    link: string;

    @ApiProperty({ description: '打开方式' })
    target: 'base' | 'blank';

    @ApiProperty({ description: '组件地址' })
    component?: string;

    @ApiProperty({ description: '显示状态' })
    @IsIn([0, 1], { message: '数据值错误' })
    hidden: number;

    @ApiProperty({ description: '菜单状态' })
    @IsIn([0, 1], { message: '数据值错误' })
    status: number;
}
