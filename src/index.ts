/**
 * @author: oldj
 * @homepage: https://oldj.net
 */

import { human2miao, miao2human, isMiao } from './trans'

export default {
  human2miao,
  miao2human,
  encode: human2miao,
  decode: miao2human,
  isMiao,
}
