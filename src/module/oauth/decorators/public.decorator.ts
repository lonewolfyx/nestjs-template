import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '~/constants/oauth.constant';

/**
 * 当接口不需要检测用户登录时添加该装饰器
 */
export const Public = () => SetMetadata(PUBLIC_KEY, true);
