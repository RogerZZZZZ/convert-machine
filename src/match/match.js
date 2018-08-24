import { isObj } from '../libs/type'
import { has } from '../libs/helpers'
import parser from './parser'

export const matchObject = function matchObject (data, obj) {
  const result = {}
  for (let i in obj) {
    if (!has(obj, i)) continue
    const rules = parser.parse(obj[i], i)
    result[i] = parser.assignData(data, rules)
  }
  return result
}

const match = {
  parse: (data, keys) => {
    if (isObj(keys)) {
      return matchObject(data, keys)
    }
    return data
  },
}
console.log('1111')
export default match
