import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './PrismaService';

@Global()
@Module({
    imports: [ConfigModule.forRoot()],
    providers: [PrismaService],
    exports: [PrismaService],
})
export class DatabaseModule {}
