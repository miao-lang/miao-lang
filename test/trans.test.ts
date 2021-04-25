/**
 * @author: oldj
 * @homepage: https://oldj.net
 */

import assert = require('assert')
import { human2miao, miao2human, isMiao } from '../src/trans'

describe('trans test', () => {

  const makeRndString = (len: number): string => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/='
      + '`~!@#$%^&*()_+-=[]{}\\|:;\'",./<>?'
      + '喵语博大精深，虽然只有一个“喵”的发音，但内涵十分丰富，据研究，在各个“喵”之间有着大量人眼不可见的复杂细节。'
    const n = characters.length

    let s = ''
    while (s.length < len) {
      s += characters.charAt(Math.floor(Math.random() * n))
    }

    return s
  }

  it('basic test', () => {
    let msg = 'Hello 喵星人！'
    let s = human2miao(msg)
    assert(msg !== s)
    assert(msg === miao2human(s))

    msg = '愿喵之力与你同在！May the power of Miao be with you!'
    s = human2miao(msg)
    assert(msg !== s)
    assert(msg === miao2human(s))
  })

  it('random string test', () => {
    for (let i = 0; i < 500; i++) {
      let len = Math.floor(Math.random() * 1000) + 1
      let msg = makeRndString(len)
      let miao_msg = human2miao(msg)
      assert(msg !== miao_msg)
      assert(msg === miao2human(miao_msg))

      assert(!isMiao(msg))
      assert(isMiao(miao_msg))
    }
  })

  it('support others animals calls', () => {
    let msg = 'Hello 鸽子精！'
    let s = human2miao(msg, { calls: '咕' })
    assert(msg !== s)
    assert(msg === miao2human(s))
  })
})
