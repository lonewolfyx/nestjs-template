import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Request} from 'express';
import {CLIENT_HTTP_UNAUTHORIZED, CLIENT_HTTP_UNAUTHORIZED_EXPIRED} from "~/constants/response.enum";
import {TokenService} from "../services/token.service";
import {BusinessException} from "~/exception/business.exception";
import {PUBLIC_KEY, WhiteRouterList} from "~/constants/oauth.constant";
import {Reflector} from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private TokenService: TokenService,
        private reflector: Reflector
    ) {
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {

        const request = context.switchToHttp().getRequest<Request>();

        // 检测是否是公共路由，公共路由无需校验 Token
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        // 检测是否是白名单路由，白名单路由无需校验 Token
        if (this.isWhiteRouter(request.url)) {
            return true;
        }

        // 监测是否携带 token
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new BusinessException(CLIENT_HTTP_UNAUTHORIZED);
        }

        // 验证 token 是否有效
        try {
            request['user'] = await this.TokenService.verify(token)
        } catch {
            throw new BusinessException(CLIENT_HTTP_UNAUTHORIZED_EXPIRED);
        }

        return true;
    }

    /**
     * 获取请求头中的 token
     * @param request
     * @private
     */
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    /**
     * 检测是否为白名单路由
     * @param url
     * @private
     */
    private isWhiteRouter(url: string) {
        return WhiteRouterList.includes(url)
    }
}
