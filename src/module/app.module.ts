import {Module} from '@nestjs/common';
import {OauthModule} from './oauth/oauth.module';
import {APP_FILTER, APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
import {AllExceptionFilter} from '~/exception/all.exception.filter';
import {ResponseInterceptor} from '~/interceptor/response.interceptor';
import {DatabaseModule} from '~/common/database/database.module';
import {ConfigModule} from "@nestjs/config";
import {RedisModule} from "~/common/redis/redis.module";
import {AuthGuard} from "./oauth/guard/auth.guard";
import {TransformDateInterceptorInterceptor} from "~/interceptor/transform-date-interceptor.interceptor";
import {TransformNumberInterceptorInterceptor} from "~/interceptor/transform-number-interceptor.interceptor";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        OauthModule,
        DatabaseModule,
        RedisModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformDateInterceptorInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformNumberInterceptorInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],
})
export class AppModule {
}
