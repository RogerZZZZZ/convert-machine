import {
  isArray,
  isObject,
  isString,
  isFunction,
} from '../libs/type'
import { pipeline } from '../libs/condition-pipeline'
import {
  arrParser,
  paramParser,
} from './reg-parse'

import { parseFun } from './match'

export const parser = {
  parse: (data, key) => {
    const isNotString = (o) => (!isString(o))

    const res = pipeline(data)
      .on(isFunction, d => ({type: 'function', data: d}))

      .on(isArray, arrParser)

      .on(isObject, d => ({type: 'object', data: parseFun(d)}))

      .on(isNotString, d => ({type: 'no', data: d}))

      .default(paramParser)
    return res
  },
}

export default parser
