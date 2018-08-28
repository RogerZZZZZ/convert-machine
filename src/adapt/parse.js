import {
  isArray,
  isObject,
  isString,
  isFunction,
} from '../libs/type'
import {
  convert
} from '../libs/convert'
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
    let value = item.value
    if (item.pattern) {
      value = extract(data, value)
    }
    if (item.type) value = convert(value, item.type)
    return value
  }

  return getData(index)
}

export const parser = {
  parse: (data, key) => {
    const pattReg = /~\{(.*)\}/
    const strReg = /(?:(.*?)(\|\||(?:&&)))|(.+)/gi
    const typeReg = /\((.*)\)(.+)/
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

      let value = val.trim()

      const type = typeReg.exec(value)
      if (type && type[1] && type[2]) {
        value = type[2].trim()
        obj.type = type[1].trim()
      }

      const isPattern = pattReg.exec(value)
      if (isPattern) {
        value = isPattern[1].trim()
        obj.pattern = true
      }

      obj.value = value

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
