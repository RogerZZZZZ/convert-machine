import {
  isObject,
} from './type'

const deepAssign = (target, obj) => {
  for (let field in obj) {
    if (has(target, field) && isObject(target[field]) && isObject(obj[field])) {
      deepAssign(target[field], obj[field])
    } else {
      target[field] = obj[field]
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

module.exports = {
  has,
  appendArr,
  mixObj,
}
