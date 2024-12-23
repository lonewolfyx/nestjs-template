// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            requestId?: string; // 添加你自定义的字段
        }
    }
}