/**
 * @author: oldj
 * @homepage: https://oldj.net
 */

import { Base64 } from 'js-base64'

const b64 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/='
// const codes = ['0', '1234']
const codes = ['\u200b', '\u200c\u200d']
// const codes = [
//   '\u200b',
//   '\u0300\u0301\u0302\u0303\u0304\u0306\u0307\u0308\u0309\u030a\u030b\u030c\u030d\u030e\u030f\u0310\u0311'
//   + '\u0323\u0324\u0325\u0326\u0327\u0328\u032d\u032e',
// ]

const table: string[] = []

const makeTable = () => {
  const [sep, chars] = codes
  const char_count = b64.length
  const code_len = chars.length

  while (table.length < char_count) {
    let table_len = table.length
    for (let i = 0; i < code_len; i++) {
      let c = chars.charAt(i)
      if (!table.includes(c)) {
        if (table.length >= char_count) break
        table.push(c)
      }

      for (let j = 0; j < table_len; j++) {
        if (table.length >= char_count) break
        let t = `${c}${table[j]}`
        if (!table.includes(t)) {
          table.push(t)
        }
      }
    }
  }

  for (let i = 0; i < table.length; i++) {
    table[i] = sep + table[i]
  }
}

makeTable()

export interface Human2miaoOptions {
  calls?: string;
  halfwidthSymbol?: boolean;
}

const addPunctuations = (t: string, options?: Human2miaoOptions): string => {
  const { calls = '喵', halfwidthSymbol = false } = options ?? {}
  let a = t.split('')
  let idx = 0

  while (idx < a.length) {
    let c = a[idx].charCodeAt(0)
    let delta = (c % 60) + 1
    idx += delta
    if (!a[idx]) {
      break
    }

    a[idx] += calls
    let mod = idx % 32
    switch (mod) {
      case 0:
      case 1:
      case 2:
      case 3:
        a[idx] += halfwidthSymbol ? ',' : '，'
        break
      case 7:
        a[idx] += halfwidthSymbol ? '.' : '。'
        break
      case 8:
        a[idx] += halfwidthSymbol ? '?' : '？'
        break
      case 9:
        a[idx] += halfwidthSymbol ? '!' : '！'
        break
      case 10:
        a[idx] += halfwidthSymbol ? '~' : '～'
        break
    }
  }

  t = `${calls}${a.join('')}${calls}${halfwidthSymbol ? '.' : '。'}`

  return t
}

/**
 * Add Animal Calls
 */
const addCalls = (t: string, options?: Human2miaoOptions): string => {
  t = addPunctuations(t, options)
  return t
}

export const human2miao = (t: string, options?: Human2miaoOptions): string => {
  t = Base64.encode(t)
  let len = t.length
  let arr = []

  for (let i = 0; i < len; i++) {
    let c = t.charAt(i)
    let n = b64.indexOf(c)
    // console.log(c, n, table[n])
    arr.push(table[n])
  }

  let data = arr.join('')
  return addCalls(data, options)
}

const clean = (t: string): string => {
  return t.replace(/[^\u200b\u200c\u200d]/ig, '')
}

export const miao2human = (t: string): string => {
  t = clean(t)

  for (let idx = table.length; idx >= 0; idx--) {
    let reg = new RegExp(table[idx], 'ig')
    t = t.replace(reg, b64.charAt(idx))
  }

  t = Base64.decode(t)

  return t
}

/**
 * 判断一个字符串是否是喵语言
 */
export const isMiao = (t: string): boolean => {
  if (!t) return false
  return clean(t).length > 0
}
