import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import dayjs from 'dayjs';
import {PrismaService} from "../../../common/database/PrismaService";
import {ConfigService} from "@nestjs/config";

interface UserType {
    id: bigint;
    user_name: string;
    user_pass: string;
}

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
        private ConfigService: ConfigService
    ) {
    }

    /**
     * 构造 access token
     * @param user
     */
    async build(user: UserType) {
        const payload = {
            uid: user.id,
            username: user.user_name,
        }

        const {access_token, expire_in} = await this.buildAccessToken(payload)
        const {refresh_token, refresh_token_expires_in} = await this.buildRefreshToken({
            uuid: user.id
        })

        await this.prisma.access_token.create({
            data: {
                uid: user.id,
                username: user.user_name,
                access_token: access_token,
                expire: expire_in.toString(),
                refresh_token: refresh_token,
                refresh_expire_token: refresh_token_expires_in.toString()
            }
        })


        return {
            access_token: access_token,
            expire_in: expire_in,
            refresh_token: refresh_token,
            refresh_token_expires_in: refresh_token_expires_in
        }
    }


    /**
     * 构造 Access Token
     * @param payload
     * @private
     */
    private async buildAccessToken(payload: object) {
        const jwt = await this.jwtService.signAsync(payload, {
            expiresIn: '7 days'
        })

        return {
            access_token: jwt,
            expire_in: dayjs().add(7, 'days').unix()
        }
    }

    // 构造 Refresh Token
    private async buildRefreshToken(payload: object) {
        const jwt = await this.jwtService.signAsync(payload, {
            expiresIn: '15 days'
        })

        return {
            refresh_token: jwt,
            refresh_token_expires_in: dayjs().add(15, 'days').unix()
        }
    }

    // 验证 token 是否有效
    async verify(token: string) {
        return await this.jwtService.verifyAsync(token, {
            secret: this.ConfigService.get<string>('SECRET_KEY')
        })
    }
}