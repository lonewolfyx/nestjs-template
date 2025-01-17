import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User - 用户模块')
@Controller({
    path: 'user',
    version: '1',
})
export class UserController {
    constructor(private UserService: UserService) {}

    @Get('info')
    @ApiOperation({ summary: '用户详情' })
    async info(@Req() req: Request) {
        return this.UserService.getUserInfo(req['user']['uid']);
    }
}
