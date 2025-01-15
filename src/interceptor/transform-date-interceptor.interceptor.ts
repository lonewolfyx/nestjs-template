import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {isObject} from "radash";
import {transformDate} from "../utils";

export interface Response<T> {
    data: T;
}

/**
 * 时间转换拦截器
 */
@Injectable()
export class TransformDateInterceptorInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
            .pipe(
                map((data) => {

                    if (data && isObject(data.data)) {

                        const result = data.data;

                        if ('create_time' in result) {
                            data['data']['create_time'] = transformDate(data.create_time)
                        }

                        if ('update_time' in result) {
                            data['data']['update_time'] = transformDate(data.update_time)
                        }
                    }

                    return data;
                })
            );
    }
}
