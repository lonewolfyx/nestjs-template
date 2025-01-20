export const authConfig = {
    access_token: {
        // 时长，
        duration: 7,
        // 单位
        unit: 'days' as const,
    },
    refresh_token: {
        // 时长，
        duration: 15,
        // 单位
        unit: 'days' as const,
    },
};