import {
  isObj,
  isStr,
} from 'LIBS/type'

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
    const strReg = /\~\{(.*)\}/
    const result = {}
  
    //TODO: function, object
  
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
    if (rules.noMatch) return

    if (rules.patternMatch && rules.pattern) {
      result = extractData(data, rules.pattern)
      return result
    }

    if (rules.noMatch) {
      result = rules.noMatch
      return result
    }
  }
}

export default parse