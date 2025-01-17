import { RedisKeys } from '~/constants/catch.constant';

/**
 * 构造授权 Token Redis Key
 * @param uid
 * @return string
 */
export const buildAuthTokenKey = (uid: string | number | bigint): string => {
    return `${RedisKeys.AUTH_TOKEN_PREFIX}${String(uid)}`;
};
