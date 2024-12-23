import {Injectable} from '@nestjs/common';
import {DatabaseService} from '../../common/database/database.service';

@Injectable()
export class OauthService {
    constructor(private DatabaseService: DatabaseService) {
    }

    async getUserInfo(username: string) {
        const res = await this.DatabaseService.db
            .selectFrom('user')
            .select(['username'])
            .where('username', '=', username)
            .executeTakeFirst();

        return res || [];
    }
}
