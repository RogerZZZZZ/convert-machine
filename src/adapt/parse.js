import {
  isObj,
  isStr,
  isFun,
} from '../libs/type'

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

    // TODO: function, object

    if (isFun(data)) {
      result.functionMatch = data
      return result
    }

    if (!isStr(data)) {
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

    if (rules.patternMatch && rules.pattern) {
      result = extractData(data, rules.pattern)
      return result
    }
  }
}

export default parser
