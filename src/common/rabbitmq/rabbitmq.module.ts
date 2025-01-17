import { Module } from '@nestjs/common';
import { RabbitMqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RABBITMQ_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [
                        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
                    ],
                    queue: process.env.RABBITMQ_QUEUES, // 订阅的队列名称
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    providers: [RabbitMqService],
    exports: [RabbitMqService],
})
export class RabbitmqModule {}
