import {Module} from '@nestjs/common';
import {OauthController} from './oauth.controller';
import {OauthService} from './oauth.service';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TokenService} from "./services/token.service";
import {RedisModule} from "~/common/redis/redis.module";
import {UserModule} from "../user/user.module";

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [
                ConfigModule
            ],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>('SECRET_KEY'),
                signOptions: {},
            }),
            inject: [ConfigService],
        }),
        RedisModule,
        UserModule
    ],
    controllers: [OauthController],
    providers: [OauthService, TokenService],
    exports: [OauthService, JwtModule, TokenService],
})
export class OauthModule {
}
