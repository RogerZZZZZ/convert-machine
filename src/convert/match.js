import '../libs/polyfill'
import {
  isObject,
  isArray,
} from '../libs/type'
import {
  deepAssign,
  cloneAny,
} from '../libs/helpers'
import parser from './parse'
import assign from './assign'
import config, { setConfig } from './config'
import { filter } from './config-utils'

export const parseFun = function parseFun (obj) {
  const result = {}
  for (let i in obj) {
    result[i] = parser.parse(obj[i], i)
  }
  return result
}

export const matchObject = (data, parse, chain = []) => {
  const result = {}
  for (let i in parse) {
    const newChain = [].concat(chain)
    newChain.push(i)
    const val = assign.parse(data, parse[i], newChain)
    if (filter(val)) result[i] = val
  }
  return result
}

export const matchArray = (arr, parse, chain = []) => {
  let result = []
  arr.forEach(item => {
    const val = matchObject(item, parse, chain)
    if (filter(val)) result.push(val)
  })
  return result
}

const match = {
  parse: (data, keys) => {
    let raw = cloneAny(data)
    if (isObject(keys)) {
      const parse = parseFun(keys)
      if (isArray(data)) {
        data = matchArray(data, parse)
      } else if (isObject(data)) {
        data = matchObject(data, parse)
      }
    }
    if (config.remainUnhandlered) {
      deepAssign(raw, data)
      return raw
    }
    return data
  },
  config (obj) {
    setConfig(obj)
    return this
  }
}

export default match
