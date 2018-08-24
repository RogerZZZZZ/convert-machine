import {
  isObject,
  isString,
  isFunction,
} from '../libs/type'

import {
  appendArr,
} from '../libs/helpers'

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
    const patternReg = /~\{(.*)\}/
    const strTokenReg = /(?:(.*?)(\|\||(?:&&)))|(.+)/gi
    const result = {}

    // TODO: handler the string issues

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

    if (!patternReg.test(data) && !strTokenReg.test(data)) {
      // normal string
      result.strMatch = data
      return result
    }

    const paramsArr = []
    let regResult = strTokenReg.exec(data)
    while (regResult) {
      const obj = {}
      const splitSymbol = regResult[2]
      if (splitSymbol) {
        obj.splitSymbol = splitSymbol
      }
      const val = regResult[1] ? regResult[1] : regResult[0]

      const isPattern = patternReg.exec(val)
      if (isPattern) {
        obj.value = isPattern[1]
        regResult = strTokenReg.exec(data)
        appendArr(obj, paramsArr)
        continue
      }
    }

    result.paramMatch = paramsArr
    return result
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

    if (rules.paramMatch) {
      let index = 0
      while (rules.paramMatch[index]) {
        const param = rules.paramMatch[index]
        const type = param.splitSymbol
        if (type === '||') {
          result = param.value
        } else if (type === '&&') {

        } else {

        }
      }
    }

    // handler the occasion of normal string
    result = rules.strMatch
    return result
  }
}

export default parser
