import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createPool, Pool } from 'mysql2';
import { Kysely, LogEvent, MysqlDialect } from 'kysely';
import { DB } from '../../../types/db';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    public readonly db: Kysely<DB>;
    private readonly pool: Pool;

    constructor(private readonly configService: ConfigService) {
        this.pool = createPool({
            host: this.configService.get<string>('DB_HOST'),
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            port: this.configService.get<number>('DB_PORT'),
        });

        this.db = new Kysely<DB>({
            dialect: new MysqlDialect({ pool: this.pool }),
            log: (event: LogEvent) => {
                if (event.level === 'query') {
                    // console.log(event.query.sql);
                    // console.log(
                    //     `执行的 SQL ：`,
                    //     typeof [...event.query.parameters],
                    // );
                    // console.log(`执行的 SQL 参数 ：`, event.query.parameters);
                    // console.log(
                    //     `执行的 SQL：${format(event.query.sql, {
                    //         params: ['10'],
                    //     })}`,
                    // );
                }
            },
        });
    }

    async onModuleInit() {
        //     this.db = new Kysely<Database>({
        //         dialect: new MysqlDialect({ pool: this.pool }),
        //     });
    }

    async onModuleDestroy() {
        await this.db.destroy();
        console.log('Database connection closed');
    }
}
