import { Md5 } from 'md5-typescript';

export const md5 = (str: any): string => {
    return Md5.init(str);
};
