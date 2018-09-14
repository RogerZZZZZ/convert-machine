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

export const parser = {
  parse: (data, key) => {
    const isNotString = (o) => (!isString(o))

    const res = pipeline(data)
      .on(isFunction, d => ({type: 'function', d}))

      .on(isArray, arrParser)

      .on(isObject, d => ({type: 'object', d}))

      .on(isNotString, d => ({type: 'no', d}))

      .default(paramParser)
    console.log(res)
    return res
  },
}

export default parser
