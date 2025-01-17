import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { isObject } from 'radash';

@Injectable()
export class TransformNumberInterceptorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if (data && isObject(data.data)) {
                    const result = data.data;
                    // if ('id' in result) {
                    //     data.data['id'] = Number(result.id)
                    // }
                }

                return data;
            }),
        );
    }
}
