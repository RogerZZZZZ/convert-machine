import '../libs/polyfill'
import {
  isObject,
  isArray,
} from '../libs/type'
import parser from './parse'
import { setConfig } from './config'
import { filter } from './config-utils'

const parseFun = function parseFun (obj) {
  const result = {}
  for (let i in obj) {
    result[i] = parser.parse(obj[i], i)
  }
  return result
}

export const matchObject = function matchObject (data, parse) {
  const result = {}
  for (let i in parse) {
    const val = parser.assign(data, parse[i])
    if (filter(val)) result[i] = val
  }
  return result
}

export const matchArray = function matchArray (arr, parse) {
  let result = []
  arr.forEach(item => {
    const val = matchObject(item, parse)
    if (filter(val)) result.push(val)
  })
  return result
}

const match = {
  parse: (data, keys) => {

    if (isObject(keys)) {
      const parse = parseFun(keys)
      if (isArray(data)) {
        return matchArray(data, parse)
      }

      if (isObject(data)) {
        return matchObject(data, parse)
      }
    }

    return data
  },
  config(obj) {
    setConfig(obj)
    return this
  }
}

export default match
