import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/common/database/PrismaService';
import { isEmpty } from 'radash';
import { TokenService } from './services/token.service';
import { RedisService } from '~/common/redis/redis.service';
import { ACCOUNT_PASSWORD_ERROR } from '~/constants/response.enum';
import { BusinessException } from '~/exception/business.exception';
import { buildAuthTokenKey } from '~/utils/genRedisKey';

@Injectable()
export class OauthService {
    constructor(
        private prisma: PrismaService,
        private TokenService: TokenService,
        private RedisService: RedisService,
    ) {}

    /**
     * 登录
     * @param username
     * @param password
     */
    async login(username: string, password: string) {
        const user = await this.prisma.sys_user.findFirst({
            where: {
                user_name: username,
            },
            select: {
                id: true,
                user_name: true,
                user_pass: true,
            },
        });

        if (isEmpty(user)) {
            // 抛出异常，可自定义异常
            throw new BusinessException(ACCOUNT_PASSWORD_ERROR);
        }

        // const userPassword = encryptPassword(password);
        const userPassword = password;
        if (userPassword !== user.user_pass) {
            // 可做密码错误次数限制
            // 抛出异常，用户登录的密码错误
            throw new BusinessException(ACCOUNT_PASSWORD_ERROR);
        }

        // 开始构造用户对应的 AccessToken 与 RefreshToken
        const token = await this.TokenService.build(user);

        await this.RedisService.set(buildAuthTokenKey(user.id), token.access_token);

        return token;
    }

    // /**
    //  * 获取此用户是否存在
    //  * @param username
    //  */
    // async hasUser(username: string): Promise<string | boolean> {
    //     // const res = await this.DatabaseService.db
    //     //     .selectFrom('user')
    //     //     .select(['username'])
    //     //     .where('username', '=', username)
    //     //     .executeTakeFirst();
    //     //
    //     // return res?.username || false;
    // }
    //
    // /**
    //  * 获取用户信息
    //  * @param username
    //  */
    // async getUserInfo(username: string) {
    //     // const res = await this.DatabaseService.db
    //     //     .selectFrom('user')
    //     //     .select(['username'])
    //     //     .where('username', '=', username)
    //     //     .executeTakeFirst();
    //     //
    //     // return res || [];
    // }
    //
    // /**
    //  * 注册用户
    //  */
    // async register(username: string, password: string) {
    //     // const hasUser: any = await this.hasUser(username);
    //     //
    //     // const payload = {
    //     //     username: username,
    //     // };
    //     // if (hasUser) {
    //     //     return {
    //     //         access_token: await this.jwtService.signAsync(payload),
    //     //     };
    //     // }
    //     //
    //     // await this.DatabaseService.db
    //     //     .insertInto('user')
    //     //     .values({
    //     //         username,
    //     //         password,
    //     //     })
    //     //     .execute();
    // }
}
