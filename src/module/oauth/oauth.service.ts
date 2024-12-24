import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OauthService {
    constructor(
        private DatabaseService: DatabaseService,
        private jwtService: JwtService,
    ) {}

    /**
     * 获取此用户是否存在
     * @param username
     */
    async hasUser(username: string): Promise<string | boolean> {
        const res = await this.DatabaseService.db
            .selectFrom('user')
            .select(['username'])
            .where('username', '=', username)
            .executeTakeFirst();

        return res?.username || false;
    }

    /**
     * 获取用户信息
     * @param username
     */
    async getUserInfo(username: string) {
        const res = await this.DatabaseService.db
            .selectFrom('user')
            .select(['username'])
            .where('username', '=', username)
            .executeTakeFirst();

        return res || [];
    }

    /**
     * 注册用户
     */
    async register(username: string, password: string) {
        const hasUser: any = await this.hasUser(username);

        const payload = {
            username: username,
        };
        if (hasUser) {
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }

        await this.DatabaseService.db
            .insertInto('user')
            .values({
                username,
                password,
            })
            .execute();
    }
}
