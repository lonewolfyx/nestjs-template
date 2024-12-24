import {Injectable, NestInterceptor} from '@nestjs/common';
import {ExecutionContext} from '@nestjs/common/interfaces/features/execution-context.interface';
import {map, Observable} from 'rxjs';
import {CallHandler} from '@nestjs/common/interfaces/features/nest-interceptor.interface';
import {Request} from 'express';
import {ResponseDto} from '../dto/response.dto';

/**
 * 响应拦截器
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest() as Request;

        return next.handle().pipe(map((data) => new ResponseDto(data || [], request.requestId)));
    }
}
