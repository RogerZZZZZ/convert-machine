import {
  expsResolve,
  extract,
} from '../libs/exp-resolver'
import {
  matchObject,
  matchArray,
} from './converter'
import parser from './parse'
import config from './config'

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
    let v = config.shortenDataChain ? extract(data, chain) : data
    chain = config.shortenDataChain ? [] : chain
    const func = {
      function: (d) => {
        return d.call(this, v)
      },
      no: (d) => {
        return d
      },
      math: (d) => {
        return mathParser
          .parse(d.exp)
          .evaluate(objResolve(d.param, v))
      },
      array: (d) => {
        const t = extract(data, chain)
        return matchArray(t, d)
      },
      object: (d) => {
        return matchObject(v, d, chain)
      },
      param: (d) => {
        return expsResolve(v, d)
      },
    }
    return func[pattern.type](pattern.data)
  }

}

export default assign
