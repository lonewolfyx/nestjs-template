import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/common/database/PrismaService';
import { SearchRoleDto } from '~/module/role/dto/search.role.dto';
import { filterObject } from '~/utils';
import { CreateRoleDto } from '~/module/role/dto/create.role.dto';
import { UpdateRoleDto } from '~/module/role/dto/update.role.dto';

@Injectable()
export class RoleService {
    constructor(
        private prisma: PrismaService,
    ) {
    }

    /**
     * 创建角色
     * @param dto
     */
    async createRole(dto: CreateRoleDto) {
        await this.prisma.sys_role.create({
            data: {
                role_name: dto.role_name,
                role_code: dto.role_code,
                description: dto.description,
                status: Boolean(dto.status),
            },
        });
    }

    /**
     * 删除角色
     * @param rid
     */
    async deleteRole(rid: number) {
        await this.prisma.sys_role.delete({
            where: {
                id: rid,
            },
        });
    }

    /**
     * 更新角色
     * @param rid
     * @param dto
     */
    async updateRole(rid: number, dto: UpdateRoleDto) {
        const { ...formatDto } = dto;

        const data = {
            ...formatDto,
            ...(dto.status !== undefined && { status: Boolean(dto.status) }),
        };

        await this.prisma.sys_role.update({
            where: {
                id: rid,
            },
            data: {
                ...data,
            },
        });
    }

    /**
     * 获取角色列表
     * @param search
     */
    async getList(search: SearchRoleDto) {
        const where = {
            ...filterObject(search, ['status', 'page', 'limit', 'pagination']),
            ...(search.status !== undefined && { status: Boolean(search.status) }),
        };

        return this.prisma.sys_role.findMany({
            where: { ...where },
            select: {
                id: true,
                role_name: true,
                role_code: true,
                description: true,
                status: true,
            },
        });
    }
}
