import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class RabbitMqService {
    constructor(
        @Inject('RABBITMQ_SERVICE')
        private client: ClientProxy,
        private configService: ConfigService
    ) {
    }

    producer(content: string) {

        return this.client.send(this.configService.get('RABBITMQ_QUEUES'), content).subscribe({
            error: (e) => {
                console.log({
                    message: 'Error sending message', error: {
                        message: e.err.message,
                        url: e.url
                    }
                })
            },
            complete: () => console.info('complete')
        })
    }
}
