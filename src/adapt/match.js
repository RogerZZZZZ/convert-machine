import { isObject } from '../libs/type'
import { has } from '../libs/helpers'
import parser from './parse'

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
    if (isObject(keys)) {
      return matchObject(data, keys)
    }
    return data
  },
}

export default match
