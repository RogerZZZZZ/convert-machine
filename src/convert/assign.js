import {
  expsResolve,
  extract,
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
  parse: (data, pattern, chain) => {
    const func = {
      function: (d) => {
        return d.call(this, data)
      },
      no: (d) => {
        return d
      },
      math: (d) => {
        return mathParser
          .parse(d.exp)
          .evaluate(objResolve(d.param, data))
      },
      array: (d) => {
        const v = extract(data, chain)
        return match.parse(v, d)
      },
      object: (d) => {
        return match.parse(data, d)
      },
      param: (d) => {
        return expsResolve(data, d)
      },
    }
    return func[pattern.type](pattern.data)
  }

}

export default assign
