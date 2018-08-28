import '../libs/polyfill'

import {
  isObject,
  isArray,
} from '../libs/type'
import parser from './parse'

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
    result[i] = parser.assign(data, parse[i])
  }
  return result
}

export const matchArray = function matchArray (arr, parse) {
  let result = []
  arr.forEach(item => {
    result.push(matchObject(item, parse))
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
}

export default match
