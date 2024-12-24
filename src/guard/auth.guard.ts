import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {Request} from 'express';
import {ConfigService} from '@nestjs/config'
import {CLIENT_HTTP_UNAUTHORIZED, CLIENT_HTTP_UNAUTHORIZED_EXPIRED} from "../constants/response.enum";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private ConfigService: ConfigService
    ) {
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {

        const request = context.switchToHttp().getRequest<Request>();

        // 监测是否携带 token
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            const [code, message] = CLIENT_HTTP_UNAUTHORIZED
            throw new UnauthorizedException(message)
        }

        // 验证 token 是否有效
        try {
            request['user'] = await this.jwtService.verifyAsync(token, {
                secret: this.ConfigService.get<string>('SECRET_KEY')
            })
            console.log(request['user'])
        } catch {
            const [code, message] = CLIENT_HTTP_UNAUTHORIZED_EXPIRED;
            throw new UnauthorizedException(message);
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
