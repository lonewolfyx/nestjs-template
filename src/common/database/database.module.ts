import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
    imports: [ConfigModule.forRoot()],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}
