import {
  isObject,
  isString,
  isFunction,
} from '../libs/type'

import {
  appendArr,
} from '../libs/helpers'

import match from './match'

const extract = (data, exp) => {
  const params = exp.split('.')
  let res = data
  params.forEach(item => {
    res = res[item]
  })

  return res
}

const expsResolve = (data, arr) => {
  let index = 0

  const getData = (idx) => {
    let result

    if (arr[idx]) {
      const val = resolve(arr[idx])
      const next = getData(idx + 1)
      const split = arr[idx].split

      if (split === '||') {
        result = val === undefined ? next : val
      } else if (split === '&&') {
        result = val === undefined ? false : val && next
      } else {
        result = val
      }
    }

    return result
  }

  const resolve = (item) => {
    if (item.type === 'pattern') {
      return extract(data, item.value)
    }
    return item.value
  }

  return getData(index)
}

export const parser = {
  parse: (data, key) => {
    const pattReg = /~\{(.*)\}/
    const strReg = /(?:(.*?)(\|\||(?:&&)))|(.+)/gi
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
    let rs = strReg.exec(data)
    while (rs) {
      const obj = {}
      const split = rs[2]

      if (split) {
        obj.split = split
      }
      const val = rs[1] ? rs[1] : rs[0]

      const isPattern = pattReg.exec(val)
      if (isPattern) {
        obj.value = isPattern[1].trim()
        obj.type = 'pattern'
        rs = strReg.exec(data)
        paramsArr = appendArr(obj, paramsArr)
        continue
      }

      obj.value = val.trim()
      paramsArr = appendArr(obj, paramsArr)
      rs = strReg.exec(data)
      continue
    }

    result.paramMatch = paramsArr
    return result
  },

  assign: (data, rules) => {
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
      result = extract(data, rules.pattern)
      return result
    }

    if (rules.paramMatch) {
      const arr = rules.paramMatch
      result = expsResolve(data, arr)
      return result
    }
  }
}

export default parser
