import {Module} from '@nestjs/common';
import {OauthController} from './oauth.controller';
import {OauthService} from './oauth.service';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from "@nestjs/config";

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
                signOptions: {
                    expiresIn: '60s',
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [OauthController],
    providers: [OauthService],
    exports: [OauthService],
})
export class OauthModule {
}
