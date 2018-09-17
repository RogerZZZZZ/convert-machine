import '../libs/polyfill'
import {
  isObject,
  isArray,
} from '../libs/type'
import parser from './parse'
import assign from './assign'
import { setConfig } from './config'
import { filter } from './config-utils'

const parseFun = function parseFun (obj) {
  const result = {}
  for (let i in obj) {
    result[i] = parser.parse(obj[i], i)
  }
  return result
}

const matchObject = (data, parse, chain) => {
  const result = {}
  for (let i in parse) {
    const newChain = [].concat(chain)
    newChain.push(i)
    const val = assign.parse(data, parse[i], newChain)
    if (filter(val)) result[i] = val
  }
  return result
}

const matchArray = (arr, parse, chain) => {
  let result = []
  arr.forEach(item => {
    const val = matchObject(item, parse, chain)
    if (filter(val)) result.push(val)
  })
  return result
}

const match = {
  parse: (data, keys, chain = []) => {
    if (isObject(keys)) {
      const parse = parseFun(keys)
      if (isArray(data)) {
        return matchArray(data, parse, chain)
      }

      if (isObject(data)) {
        return matchObject(data, parse, chain)
      }
    }

    return data
  },
  config (obj) {
    setConfig(obj)
    return this
  }
}

export default match
