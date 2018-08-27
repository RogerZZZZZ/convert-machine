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

const expResolve = (data, arr) => {
  let index = 0

  const getData = (idx) => {
    let result

    if (arr[idx]) {
      const val = resolveExp(arr[idx])
      const split = arr[idx].split

      if (split === '||') {
        result = val === undefined ? getData(idx + 1) : val
      } else if (split === '&&') {
        result = val === undefined ? false : val && getData(idx + 1)
      } else {
        result = val
      }
    }
    return result
  }

  const resolveExp = (item) => {
    if (item.type === 'pattern') {
      return extractData(data, item.value)
    }
    return item.value
  }

  return getData(index)
}

export const parser = {
  parse: (data, key) => {
    const patternReg = /~\{(.*)\}/
    const strTokenReg = /(?:(.*?)(\|\||(?:&&)))|(.+)/gi
    const result = {}

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

    let paramsArr = []
    let regResult = strTokenReg.exec(data)
    while (regResult) {
      const obj = {}
      const split = regResult[2]

      if (split) {
        obj.split = split
      }
      const val = regResult[1] ? regResult[1] : regResult[0]

      const isPattern = patternReg.exec(val)
      if (isPattern) {
        obj.value = isPattern[1].trim()
        obj.type = 'pattern'
        regResult = strTokenReg.exec(data)
        paramsArr = appendArr(obj, paramsArr)
        continue
      }

      obj.value = val.trim()
      paramsArr = appendArr(obj, paramsArr)
      regResult = strTokenReg.exec(data)
      continue
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
      const arr = rules.paramMatch
      result = expResolve(data, arr)
      return result
    }
  }
}

export default parser
