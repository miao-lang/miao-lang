/**
 * @author: oldj
 * @homepage: https://oldj.net
 */
export interface Human2miaoOptions {
    calls?: string;
    halfwidthSymbol?: boolean;
}
export declare const human2miao: (t: string, options?: Human2miaoOptions) => string;
export declare const miao2human: (t: string) => string;
/**
 * 判断一个字符串是否是喵语言
 */
export declare const isMiao: (t: string) => boolean;
