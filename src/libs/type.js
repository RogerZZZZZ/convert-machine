const typeCheck = (obj, type) => {
  return type === Object.prototype.toString.call(obj)
}

const isObject = obj => {
  return typeCheck(obj, '[object Object]')
}

const isArray = obj => {
  return typeCheck(obj, '[object Array]')
}

const isFunction = obj => {
  return typeCheck(obj, '[object Function]')
}

const isString = obj => {
  return typeCheck(obj, '[object String]')
}

const isNumber = obj => {
  return typeCheck(obj, '[object Number]')
}

const objectIsEmpty = obj => {
  return JSON.stringify(obj) === '{}'
}

const isEmptyArray = arr => {
  return isArray(arr) && JSON.stringify(arr) === '[]'
}

const isTruthy = any => {
  if (any) return true
  return false
}

module.exports = {
  isObject,
  isFunction,
  isArray,
  isString,
  isNumber,
  objectIsEmpty,
  isEmptyArray,
  isTruthy,
}
