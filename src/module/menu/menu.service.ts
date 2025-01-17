import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/common/database/PrismaService';
import { CreateDto } from '~/module/menu/dto/create.dto';
import { SearchDto } from '~/module/menu/dto/search.dto';
import { createPagination } from '~/utils';
import { MenuUpdateDto } from '~/module/menu/dto/menu.update.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MenuService {
    constructor(private readonly prisma: PrismaService) {
    }

    /**
     * 获取菜单列表
     * @param search
     */
    async list(search: SearchDto) {
        const selectParams = {
            orderBy: {
                id: Prisma.SortOrder.asc,
            },
            select: {
                id: true,
                parent_id: true,
                menu_name: true,
                order: true,
                menu_type: true,
                menu_icon: true,
                link: true,
                target: true,
                component: true,
                hidden: true,
                status: true,
            },
        };

        if (search.pagination) {
            delete selectParams.select.hidden;
            delete selectParams.select.status;
            return this.prisma.sys_menu.findMany({
                ...selectParams,
            });
        }

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

    /**
     * 更新菜单
     * @param mid
     * @param dto
     */
    async update(mid: number, dto: MenuUpdateDto) {
        const { ...formatDto } = dto;

        const data = {
            ...formatDto,
            hidden: Boolean(dto.hidden),
            status: Boolean(dto.status),
        };

        await this.prisma.sys_menu.update({
            where: {
                id: mid,
            },
            data: { ...data },
        });
    }

    /**
     * 批量删除菜单
     * @param ids
     */
    async batchDelete(ids: number[] | bigint[]) {
        await this.prisma.sys_menu.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }
}
