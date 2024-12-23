import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces/features/pipe-transform.interface';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidatePipe implements PipeTransform {
    // value 为当前的请求参数，即 DTO 中的参数内容
    async transform(value: any, { metatype }: ArgumentMetadata) {
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            // console.log(Object.values(errors[0]['constraints'])[0]);
            // 直接取 DTO 中校验的错误提示语
            const tips = Object.values(errors[0]['constraints'])[0];
            throw new BadRequestException(tips);
            // throw new BadRequestException('Validation failed')
        }

        return value;
    }
}
