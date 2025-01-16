import {HttpStatus, Injectable, NestInterceptor} from '@nestjs/common';
import {ExecutionContext} from '@nestjs/common/interfaces/features/execution-context.interface';
import {map, Observable} from 'rxjs';
import {CallHandler} from '@nestjs/common/interfaces/features/nest-interceptor.interface';
import {Request, Response} from 'express';
import {ResponseDto} from '~/dto/response.dto';

/**
 * 响应拦截器
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest() as Request;
        const response = context.switchToHttp().getResponse() as Response;

        // 由于 nestjs 默认返回 201 状态码，这里改为 200
        if (request.method === 'POST' && response.statusCode === HttpStatus.CREATED) {
            response.status(HttpStatus.OK)
        }

        return next.handle().pipe(map((data) => new ResponseDto(data || [], request.requestId)));
    }
}
