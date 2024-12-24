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

    /**
     * 设置响应状态码
     * @param code
     */
    setCode(code: number) {
        this.code = code;
        return this;
    }

    /**
     * 设置数据
     * @param data
     */
    setData(data: T) {
        this.data = data;
        return this;
    }

    /**
     * 设置消息
     * @param message
     */
    setMessage(message: string) {
        this.message = message;
        return this;
    }

    /**
     * 设置请求 ID
     * @param requestId
     */
    setRequestId(requestId: string) {
        this.request_id = requestId;
        return this;
    }
}
