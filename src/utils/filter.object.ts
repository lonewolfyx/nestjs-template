/**
 * 过滤对象中的指定键
 * @param data - 需要过滤的对象
 * @param keys - 需要删除的键（可以是字符串或字符串数组）
 * @returns 过滤后的新对象
 */
export const filterObject = <T extends Record<string, any>, K extends keyof T>(data: T, keys: K | K[]): Omit<T, K> => {
    // 如果 keys 是字符串，转换为数组
    const keysToRemove = Array.isArray(keys) ? keys : [keys];

    // 如果 keys 不是数组或为空，直接返回原对象
    if (keysToRemove.length === 0) {
        return { ...data };
    }

    // 创建一个新对象，过滤掉指定的键
    return Object.keys(data).reduce((acc, key) => {
        if (!keysToRemove.includes(key as K)) {
            acc[key as keyof Omit<T, K>] = data[key];
        }
        return acc;
    }, {} as Omit<T, K>);
};