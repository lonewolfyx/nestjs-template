import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: [
                {
                    emit: 'event',
                    level: 'query',
                },
            ],
        });

        // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // // @ts-expect-error
        // this.$on('query', (e: Prisma.QueryEvent) => {
        //     let query = e.query;
        //     const params = JSON.parse(e.params);
        //
        //     params.forEach((param: any) => {
        //         if (typeof param === 'object') {
        //             query = query.replace('?', JSON.stringify(param));
        //         } else {
        //             query = query.replace('?', typeof param === 'string' ? `'${param}'` : param);
        //         }
        //     });
        //
        //     // 打印完整的 SQL 语句
        //     console.log('Full SQL Query:', query);
        //     console.log('Duration:', e.duration + 'ms');
        // })
    }

    async onModuleInit() {
        await this.$connect();
    }
}
