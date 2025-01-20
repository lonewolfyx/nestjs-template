import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenuService } from '~/module/menu/menu.service';
import { CreateDto } from '~/module/menu/dto/create.dto';
import { SearchDto } from '~/module/menu/dto/search.dto';
import { MenuUpdateDto } from '~/module/menu/dto/menu.update.dto';

@ApiTags('menu - 菜单管理')
@Controller({
    path: 'menu',
    version: '1',
})
export class MenuController {
    constructor(private MenuService: MenuService) {
    }

    @Get('list')
    @ApiOperation({ summary: '菜单列表' })
    async list(@Query() search: SearchDto) {
        return this.MenuService.list(search);
    }

    @Post('add')
    @ApiOperation({ summary: '创建菜单' })
    async add(@Body() dto: CreateDto) {
        await this.MenuService.create(dto);
    }

    @Put(':mid')
    @ApiOperation({ summary: '更新菜单' })
    async update(@Param('mid') mid: number, @Body() dto: MenuUpdateDto) {
        await this.MenuService.update(mid, dto);
    }

    @Delete('batch')
    @ApiOperation({ summary: '批量删除菜单' })
    async batchDelete(@Body('ids') ids: number[]) {
        await this.MenuService.batchDelete(ids);
    }

    @Delete(':mid')
    @ApiOperation({ summary: '删除菜单' })
    async delete(@Param('mid') mid: number) {
        await this.MenuService.delete(mid);
    }
}
