import { HttpStatus } from '@nestjs/common';

export class ResponseDto<T> {
    code: number;

    data: T;

    message: string;

    request_id: string;

    constructor(data: T, requestId: string, message: string = 'success') {
        this.code = HttpStatus.OK;
        this.data = data;
        this.message = message;
        this.request_id = requestId;
    }
}
