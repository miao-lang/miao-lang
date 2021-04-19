"use strict";
/**
 * @author: oldj
 * @homepage: https://oldj.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.miao2human = exports.human2miao = void 0;
var js_base64_1 = require("js-base64");
var b64 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/=';
// const codes = ['0', '1234']
var codes = ['\u200b', '\u200c\u200d'];
// const codes = [
//   '\u200b',
//   '\u0300\u0301\u0302\u0303\u0304\u0306\u0307\u0308\u0309\u030a\u030b\u030c\u030d\u030e\u030f\u0310\u0311'
//   + '\u0323\u0324\u0325\u0326\u0327\u0328\u032d\u032e',
// ]
var table = [];
var makeTable = function () {
    var sep = codes[0], chars = codes[1];
    var char_count = b64.length;
    var code_len = chars.length;
    while (table.length < char_count) {
        var table_len = table.length;
        for (var i = 0; i < code_len; i++) {
            var c = chars.charAt(i);
            if (!table.includes(c)) {
                if (table.length >= char_count)
                    break;
                table.push(c);
            }
            for (var j = 0; j < table_len; j++) {
                if (table.length >= char_count)
                    break;
                var t = "" + c + table[j];
                if (!table.includes(t)) {
                    table.push(t);
                }
            }
        }
    }
    for (var i = 0; i < table.length; i++) {
        table[i] = sep + table[i];
    }
};
makeTable();
var addPunctuations = function (t) {
    var a = t.split('');
    var idx = 0;
    while (idx < a.length) {
        var c = a[idx].charCodeAt(0);
        var delta = (c % 60) + 1;
        idx += delta;
        if (!a[idx]) {
            break;
        }
        a[idx] += '喵';
        var mod = idx % 32;
        switch (mod) {
            case 0:
            case 1:
            case 2:
            case 3:
                a[idx] += '，';
                break;
            case 7:
                a[idx] += '。';
                break;
            case 8:
                a[idx] += '？';
                break;
            case 9:
                a[idx] += '！';
                break;
            case 10:
                a[idx] += '～';
                break;
        }
    }
    t = '喵' + a.join('') + '喵。';
    return t;
};
var addMiao = function (t) {
    t = addPunctuations(t);
    return t;
};
var human2miao = function (t) {
    t = js_base64_1.Base64.encode(t);
    var len = t.length;
    var arr = [];
    for (var i = 0; i < len; i++) {
        var c = t.charAt(i);
        var n = b64.indexOf(c);
        // console.log(c, n, table[n])
        arr.push(table[n]);
    }
    var data = arr.join('');
    return addMiao(data);
};
exports.human2miao = human2miao;
var miao2human = function (t) {
    t = t.replace(/[^\u200b\u200c\u200d]/ig, '');
    for (var idx = table.length; idx >= 0; idx--) {
        var reg = new RegExp(table[idx], 'ig');
        t = t.replace(reg, b64.charAt(idx));
    }
    t = js_base64_1.Base64.decode(t);
    return t;
};
exports.miao2human = miao2human;
//# sourceMappingURL=trans.js.map