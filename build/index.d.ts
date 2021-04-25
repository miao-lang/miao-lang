/**
 * @author: oldj
 * @homepage: https://oldj.net
 */
declare const _default: {
    human2miao: (t: string, options?: import("./trans").Human2miaoOptions | undefined) => string;
    miao2human: (t: string) => string;
    encode: (t: string, options?: import("./trans").Human2miaoOptions | undefined) => string;
    decode: (t: string) => string;
    isMiao: (t: string) => boolean;
};
export default _default;
