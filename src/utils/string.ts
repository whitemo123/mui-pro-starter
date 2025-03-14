/**
 * _转换成驼峰命名
 * @param str 字符串
 * @returns 
 */
export function snakeToCamel(str: string): string {
    return str.toLowerCase().replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
}