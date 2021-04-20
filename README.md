# 喵语言（Miao-lang）

这是一个可以将人类语言翻译为喵语言的程序。

在线演示：[https://miao-lang.com](https://miao-lang.com)

## 特性

 - 可以将任意文本转为由若干“喵”组成的喵语言，且这个过程是可逆的
 - 支持网页、微信等常见应用，将喵语言复制到这些应用并发送不会损失信息

## 安装

```bash
npm install miao-lang
```

## 使用方法

```ts
import Miao from 'miao-lang'

let human_msg = 'Hello 喵星人！'
let miao_msg = Miao.encode(human_msg)

console.log(miao_msg) // 喵​‍‍‌‌‌​‌‍‍‌‌​‍‍‌‍‍​‍‍‍‌​‍‌‍​‌‍‍‌‌​‌‍‌​‌‌‍‌​‍‍喵​‍‍‍‍‍​‍‌‌​‍​‍‍​‍‌‍‍​‌‍‌‌​‌‌‌‍​‍‍​‍‌‌‌‍​‍‍‌‌​‌喵‌‌​‌‌‍​‌‌‍​‌‌‍‌‌​‌‌‍‍‍喵。

let msg2 = Miao.decode(miao_msg)

console.log(msg2) // Hello 喵星人！
console.log(msg2 === human_msg) // true
```

### API

 - `Miao.encode(t: string): string` 将普通文本转为喵语言
 - `Miao.decode(t: string): string` 将喵语言转为普通文本
 - `Miao.isMiao(t: string): string` 判断输入的文本是否为喵语言

## 工作原理

喵语言本质上是一种文本编码、解码算法，其原理为使用零宽字符将原文编码，并隐藏于若干“喵”之中。目前版本中所用到的零宽字符有 `\u200b`、`\u200c`、`\u200d` 。

其中编码流程如下：

 0. 生成 Base64 字符与零宽字符的对照表；
 1. 将原文转为 Base64 编码；
 2. 使用对照表将 Base64 编码后的内容转为由零宽字符组成的不可见的新编码；
 3. 根据一定规则，在新编码的最前、最后以及中间位置，插入若干“喵”以及标点符号；
 4. 完成。

解码过程则是以上流程的逆运算。

## 最后

本项目纯属娱乐，祝大家玩得开心！
愿喵之力与你同在！

![](https://github.githubassets.com/images/mona-whisper.gif)
