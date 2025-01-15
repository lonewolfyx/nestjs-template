import {HttpException} from "@nestjs/common/exceptions/http.exception";
import {isArray} from "radash";
import {HttpStatus} from "@nestjs/common";

export class BusinessException extends HttpException {
    constructor(error: string | Record<string, any>) {
        if (isArray(error)) {
            const [code, message] = error;
            super(message, code);

            return;
        } else {
            super(error, HttpStatus.OK);
        }
    }
}