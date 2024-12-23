import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ValidatePipe } from '../../validate/validate.pipe';
import { OauthService } from './oauth.service';

@Controller({
    path: 'oauth',
    version: '1',
})
export class OauthController {
    constructor(private OauthService: OauthService) {}

    @Post('login')
    async login(@Body(new ValidatePipe()) LoginDto: LoginDto) {
        return await this.OauthService.getUserInfo(LoginDto.username);
    }
}
