import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from '~/module/role/role.service';
import { CreateRoleDto } from '~/module/role/dto/create.role.dto';

@ApiTags('Role - 角色管理')
@Controller({
    path: 'role',
    version: '1',
})
export class RoleController {
    constructor(
        private readonly RoleService: RoleService,
    ) {
    }

    @Get('list')
    @ApiOperation({ summary: '角色列表' })
    list() {
        // TODO 待完成的 service
        return [];
    }

    @Post('add')
    @ApiOperation({ summary: '创建角色' })
    add(@Body() dto: CreateRoleDto) {
        // TODO 待完成的 service
        return dto;
    }

    @Put(':rid')
    update(@Param('rid') rid: number) {
        // TODO 待完成的 service
        return rid;
    }

    @Delete(':rid')
    @ApiOperation({ summary: '角色删除' })
    roleDelete(@Param('rid') rid: number) {
        // TODO 待完成的 service
        return rid;
    }
}
