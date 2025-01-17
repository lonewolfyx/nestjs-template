import dayjs, {ConfigType} from "dayjs";

/**
 * 时间转换
 * @param date 时间
 * @param template 格式化占位符
 */
export const transformDate = (date: ConfigType, template = 'YYYY-MM-DD HH:mm:ss'): string => {
    return dayjs(date).format(template)
}