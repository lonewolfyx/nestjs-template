import {
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ExceptionFilter,
    ForbiddenException,
    GatewayTimeoutException,
    GoneException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotAcceptableException,
    NotFoundException,
    NotImplementedException,
    PayloadTooLargeException,
    RequestTimeoutException,
    ServiceUnavailableException,
    UnauthorizedException,
    UnsupportedMediaTypeException,
} from '@nestjs/common';
import { ArgumentsHost, HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Request, Response } from 'express';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ResponseDto } from '~/dto/response.dto';
import { ErrorCode } from '~/constants/error.code.constant';

type UnifiedException =
    | BadRequestException
    | HttpException
    | UnauthorizedException
    | NotFoundException
    | ForbiddenException
    | NotAcceptableException
    | RequestTimeoutException
    | ConflictException
    | GoneException
    | PayloadTooLargeException
    | UnsupportedMediaTypeException
    | InternalServerErrorException
    | NotImplementedException
    | BadGatewayException
    | ServiceUnavailableException
    | GatewayTimeoutException;

/**
 * 所有异常过滤器
 */
@Injectable()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: UnifiedException | Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp() as HttpArgumentsHost;
        const response: Response = ctx.getResponse<Response>();
        const request: Request = ctx.getRequest<Request>();

        // console.log(exception.constructor.name, exception);

        let status: number;
        let message: string;

        // 类型保护，检查是否有 getStatus 方法
        if ('getStatus' in exception && typeof exception.getStatus === 'function') {
            status = exception.getStatus();
            message = exception.message;
        } else {
            // 默认状态
            status = 10000;
            message = 'system error';
        }

        if (exception instanceof BadRequestException) {
            status = ErrorCode.BAD_REQUEST;
        }

        response.status(HttpStatus.OK).json(new ResponseDto([], request.requestId).setCode(status).setMessage(message));
    }
}
