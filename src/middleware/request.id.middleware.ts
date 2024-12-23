import { NextFunction, Request, Response } from 'express';
import { md5 } from '../utils';

export const RequestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.requestId = md5(Date.now());
    next();
};
