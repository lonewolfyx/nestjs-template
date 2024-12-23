import { Module } from '@nestjs/common';
import { OauthModule } from './oauth/oauth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from '../exception/all.exception.filter';
import { ResponseInterceptor } from '../interceptor/ResponseInterceptor';
import { DatabaseModule } from '../common/database/database.module';

@Module({
    imports: [OauthModule, DatabaseModule],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
    ],
})
export class AppModule {}
