import {md5} from "./md5";

export const encryptPassword = (password: string): string => {
    return md5(`@p0>UyufTRTcq$m$yfQ${password}4@i[m+BUm5`);
};