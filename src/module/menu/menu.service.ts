import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/common/database/PrismaService';
import { CreateDto } from '~/module/menu/dto/create.dto';
import { SearchDto } from '~/module/menu/dto/search.dto';
import { createPagination } from '~/utils';

@Injectable()
export class MenuService {
    constructor(private readonly prisma: PrismaService) {}

    async list(search: SearchDto) {
        const selectParams = {
            orderBy: {
                id: 'desc',
            },
            select: {
                id: true,
                menu_type: true,
                create_time: true,
            },
        };

        return createPagination(this.prisma.sys_menu, selectParams, {
            page: search.page,
            limit: search.limit,
        });
    }

    /**
     * 创建菜单
     * @param dto
     */
    async create(dto: CreateDto) {
        const data = {
            parent_id: BigInt(dto.parent_id),
            menu_name: dto.menu_name,
            order: dto.order,
            menu_type: dto.menu_type,
            menu_icon: dto.menu_icon,
            link: dto.link,
            target: dto.target,
            component: dto.component,
            hidden: Boolean(dto.hidden),
            status: Boolean(dto.status),
        };

        await this.prisma.sys_menu.create({
            data,
        });
    }

    /**
     * 删除菜单
     * @param mid
     */
    async delete(mid: number) {
        await this.prisma.sys_menu.delete({
            where: {
                id: mid,
            },
        });
    }
}
