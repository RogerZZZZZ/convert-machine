import {
  expsResolve,
  extract
} from '../libs/exp-resolver'
import match from './match'
import parser from './parse'

const MathParser = require('expr-eval').Parser
const mathParser = new MathParser()

const objResolve = (obj, data) => {
  for (let i in obj) {
    const rule = parser.parse(obj[i], i)
    obj[i] = assign.parse(data, rule)
  }
  return obj
}

const assign = {
  parse: (data, rules) => {
    let result
    if (rules.noMatch) {
      result = rules.noMatch
      return result
    }

    if (rules.functionMatch) {
      result = rules.functionMatch.call(this, data)
      return result
    }

    if (rules.mathMatch) {
      return mathParser
        .parse(rules.mathMatch)
        .evaluate(objResolve(rules.param, data))
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

export default assign
