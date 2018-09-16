import {
  isObject
} from '../libs/type'

const config = {
  ignoreEmptyValue: false,
  ignoreEmptyArray: false,
  ignoreEmptyObject: false,
  remainUnhandlered: false,
  shortDataChain: false,
}

export const setConfig = (obj) => {
  if (!isObject(obj)) return

  Object.assign(config, obj)
}

export default config
