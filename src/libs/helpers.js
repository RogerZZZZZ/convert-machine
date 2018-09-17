import {
  isObject,
  isArray,
} from './type'

const deepAssign = (target, obj) => {
  if (isArray(target) && isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      deepAssign(target[i], obj[i])
    }
  } else if (isObject(target) && isObject(obj)) {
    for (let field in obj) {
      if (has(target, field)
        && ((isObject(target[field]) && isObject(obj[field]))
            || (isArray(target[field]) && isArray(obj[field])))) {
        deepAssign(target[field], obj[field])
      } else {
        target[field] = obj[field]
      }
    }
  }
}

const has = (obj, key) => ({}.hasOwnProperty.call(obj, key))

const appendArr = (item, arr) => {
  if (arr && arr.length) {
    arr.push(item)
    return arr
  }
  return [item]
}

const mixObj = (args) => {
  let res = {}
  args.forEach(item => {
    res = Object.assign(res, item)
  })

  return res
}

const cloneAny = (target) => {
  let res
  if (isArray(target)) {
    res = [].concat(target)
  } else if (isObject(target)) {
    res = Object.assign({}, target)
  } else {
    res = target
  }
  return res
}

module.exports = {
  has,
  appendArr,
  mixObj,
  deepAssign,
  cloneAny,
}
