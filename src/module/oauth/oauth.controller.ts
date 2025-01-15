import {Body, Controller, Post} from '@nestjs/common';
import {OauthService} from './oauth.service';
import {LoginDto} from "./dto/login.dto";
import {RegisterDto} from "./dto/register.dto";
import {ValidatePipe} from "../../validate/validate.pipe";
import {UserService} from "../user/user.service";

@Controller({
    path: 'oauth',
    version: '1',
})
export class OauthController {
    constructor(
        private OauthService: OauthService,
        private UserService: UserService
    ) {
    }

    // @Post('login')
    // async login(@Body(new ValidatePipe()) LoginDto: LoginDto) {
    //     return await this.OauthService.getUserInfo(LoginDto.username);
    // }
    //
    // @Post('register')
    // register(@Body(new ValidatePipe()) LoginDto: LoginDto) {
    //     return this.OauthService.register(LoginDto.username, LoginDto.password);
    // }
    //
    // @Get('list')
    // @UseGuards(AuthGuard)
    // list(@Req() req: Request) {
    //     return req['user']['username']
    // }

    @Post('login')
    async login(@Body() LoginDto: LoginDto) {
        return this.OauthService.login(LoginDto.username, LoginDto.password)
    }

    @Post('register')
    async register(@Body(new ValidatePipe()) dto: RegisterDto) {
        return this.UserService.register(dto)
    }
}
