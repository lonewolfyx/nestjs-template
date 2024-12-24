import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {ValidatePipe} from '../../validate/validate.pipe';
import {OauthService} from './oauth.service';
import {AuthGuard} from "../../guard/auth.guard";

@Controller({
    path: 'oauth',
    version: '1',
})
export class OauthController {
    constructor(private OauthService: OauthService) {
    }

    @Post('login')
    async login(@Body(new ValidatePipe()) LoginDto: LoginDto) {
        return await this.OauthService.getUserInfo(LoginDto.username);
    }

    @Post('register')
    register(@Body(new ValidatePipe()) LoginDto: LoginDto) {
        return this.OauthService.register(LoginDto.username, LoginDto.password);
    }

    @Get('list')
    @UseGuards(AuthGuard)
    list(@Req() req: Request) {
        return req['user']['username']
    }
}
