import {NestFactory} from '@nestjs/core';
import {AppModule} from './module/app.module';
import {VersioningType} from '@nestjs/common';
import {RequestIdMiddleware} from './middleware/request.id.middleware';
import * as os from "node:os";

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

    await app.listen(process.env.PORT ?? 3000)

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
        .forEach(detail => {
            console.info(`  ➜  Network: http://${detail.address}:${port}`)
        })

})()

