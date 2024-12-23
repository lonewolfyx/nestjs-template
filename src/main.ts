import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { VersioningType } from '@nestjs/common';
import { RequestIdMiddleware } from './middleware/request.id.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 开启多版本支持
    app.enableVersioning({
        type: VersioningType.URI,
    });

    // 创建请求 id
    app.use(RequestIdMiddleware);

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
