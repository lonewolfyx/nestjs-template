import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { RequestIdMiddleware } from './middleware/request.id.middleware';
import * as os from 'node:os';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

(async () => {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    // 开启多版本支持
    app.enableVersioning({
        type: VersioningType.URI,
    });

    // 创建请求 id
    app.use(RequestIdMiddleware);

    // 开启前缀
    // app.setGlobalPrefix('api');

    app.useGlobalPipes(
        new ValidationPipe({
            // 根据对象的 DTO 类自动将有效负载转换为对象类型
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    // 初始化 swagger 文档
    const options = new DocumentBuilder()
        .setTitle('NestJs 模板')
        .setDescription('这是项目的 api 文档')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    await app.listen(process.env.PORT ?? 3000, () => {
        const port = app.getHttpServer().address().port;

        Object.values(os.networkInterfaces())
            .flatMap((nInterface) => nInterface ?? [])
            .filter(
                (detail) =>
                    detail.address &&
                    (detail.family === 'IPv4' ||
                        // @ts-expect-error Node 18.0 - 18.3 returns number
                        detail.family === 4),
            )
            .forEach((detail) => {
                console.info(`  ➜  Network: http://${detail.address}:${port}`);
            });
    });
})();
