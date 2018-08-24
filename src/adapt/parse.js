import {
  isObject,
  isString,
  isFunction,
} from '../libs/type'

import match from './match'

const extractData = (data, exp) => {
  const params = exp.split('.')
  let res = data
  params.forEach(item => {
    res = res[item]
  })
  return res
}

export const parser = {
  parse: (data, key) => {
    const strReg = /~\{(.*)\}/
    const result = {}

    // TODO: handler the string issues
    // TODO: handler the default value

    if (isFunction(data)) {
      result.functionMatch = data
      return result
    }

    if (isObject(data)) {
      result.objectMatch = data
      return result
    }

    if (!isString(data)) {
      result.noMatch = data
      return result
    }

    const matchResult = strReg.exec(data)
    if (matchResult) {
      result.patternMatch = true

      const pattern = matchResult[1]
      if (pattern) result.pattern = pattern
      return result
    }
  },

  assignData: (data, rules) => {
    let result
    if (rules.noMatch) {
      result = rules.noMatch
      return result
    }

    if (rules.functionMatch) {
      result = rules.functionMatch.call(this, data)
      return result
    }

    if (rules.objectMatch) {
      result = match.parse(data, rules.objectMatch)
      return result
    }

    if (rules.patternMatch && rules.pattern) {
      result = extractData(data, rules.pattern)
      return result
    }
  }
}

export default parser
