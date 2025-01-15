import {Controller, Get, Req} from '@nestjs/common';
import {Request} from "express";
import {UserService} from "./user.service";

@Controller({
    path: 'user',
    version: '1',
})
export class UserController {

    constructor(
        private UserService: UserService
    ) {
    }


    @Get('info')
    async info(@Req() req: Request) {
        return this.UserService.getUserInfo(req['user']['uid'])
    }
}
