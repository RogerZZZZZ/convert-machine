import config from './config'
import {
  isEmptyArray,
  objectIsEmpty,
} from '../libs/type'

export const filter = (any) => {
  if ((config.ignoreEmptyValue && (any === undefined || any === null))
      || (config.ignoreEmptyArray && isEmptyArray(any))
      || (config.ignoreEmptyObject && objectIsEmpty(any))) {
    return false
  }
  return true
}
