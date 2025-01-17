import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenuService } from '~/module/menu/menu.service';
import { CreateDto } from '~/module/menu/dto/create.dto';
import { OPERATION_SUCCESSFUL } from '~/constants/response.enum';
import { SearchDto } from '~/module/menu/dto/search.dto';

@ApiTags('menu - 菜单管理')
@Controller({
    path: 'menu',
    version: '1',
})
export class MenuController {
    constructor(
        private MenuService: MenuService,
    ) {
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
        return OPERATION_SUCCESSFUL;
    }

    // @Get(':mid')
    // @ApiOperation({ summary: '更新菜单' })
    // update(@Query('id') id: number) {
    //     return { id };
    // }

    @Delete(':mid')
    @ApiOperation({ summary: '删除菜单' })
    async delete(@Param('mid') mid: number) {
        await this.MenuService.delete(mid);
        return OPERATION_SUCCESSFUL;
    }
}
