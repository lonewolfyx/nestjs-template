import { BadRequestException, ExceptionFilter, Injectable } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Request, Response } from 'express';

@Injectable()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse() as Response;
        const request = ctx.getRequest() as Request;

        // console.log(Object.prototype.toString.call(exception))
        // console.log(exception)
        // const status = exception.getStatus();
        // //
        // // console.log(exception instanceof BadRequestException)
        //
        response.status(200).json({
            message: exception.message,
        });
    }
}
