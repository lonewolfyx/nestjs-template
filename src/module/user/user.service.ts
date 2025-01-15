import {Injectable} from '@nestjs/common';
import {RegisterDto} from "../oauth/dto/register.dto";
import {PrismaService} from "../../common/database/PrismaService";
import {BusinessException} from "../../exception/business.exception";
import {SERVICE_REGISTER_ACCOUNT_ERROR} from "../../constants/response.enum";
import {UserWhereTypes} from "../../../types/users";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) {
    }


    /**
     * 获取用户信息
     * @param uid 用户 ID
     */
    async getUserInfo(uid: number) {
        return this.prisma.sys_user.findFirst({
            where: {
                id: uid
            },
            select: {
                id: true,
                user_name: true,
                phone: true,
                email: true,
                status: true,
                create_time: true,
                update_time: true
            }
        })

    }

    /**
     * 注册用户
     * @param registerDto
     */
    async register(registerDto: RegisterDto) {
        // 判断用户名是否存在
        if (
            await this.hasUser({
                user_name: registerDto.username
            })
        ) {
            throw new BusinessException(SERVICE_REGISTER_ACCOUNT_ERROR)
        }

        await this.prisma.sys_user.create({
            data: {
                user_name: registerDto.username,
                user_pass: registerDto.password,
                phone: '',
                email: '',
                status: true
            }
        })

        return '注册成功'
    }

    /**
     * 判断用户是否存在
     * @param userWhere
     */
    async hasUser(userWhere: UserWhereTypes) {
        return this.prisma.sys_user.findFirst({
            where: userWhere,
            select: {
                user_name: true,
            }
        })
    }
}
