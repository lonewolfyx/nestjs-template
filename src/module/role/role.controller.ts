import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from '~/module/role/role.service';
import { CreateRoleDto } from '~/module/role/dto/create.role.dto';
import { SearchRoleDto } from '~/module/role/dto/search.role.dto';
import { UpdateRoleDto } from '~/module/role/dto/update.role.dto';

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
    async list(@Query() search: SearchRoleDto) {
        return this.RoleService.getList(search);
    }

    @Post('add')
    @ApiOperation({ summary: '创建角色' })
    async add(@Body() dto: CreateRoleDto) {
        await this.RoleService.createRole(dto);
    }

    @Put(':rid')
    async update(@Param('rid') rid: number, @Body() dto: UpdateRoleDto) {
        await this.RoleService.updateRole(rid, dto);
    }

    @Delete(':rid')
    @ApiOperation({ summary: '角色删除' })
    async roleDelete(@Param('rid') rid: number) {
        await this.RoleService.deleteRole(rid);
    }
}
