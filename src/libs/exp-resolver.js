import { convert } from './convert'
import {
  isTruthy,
  isArray,
} from './type'

export const expsResolve = (data, arr) => {
  let index = 0

  const getData = (idx) => {
    let result

    if (arr[idx]) {
      const val = resolve(arr[idx])
      const next = getData(idx + 1)
      const split = arr[idx].split

      if (split === '||') {
        result = isTruthy(val) ? val : next
      } else if (split === '&&') {
        result = val === undefined ? false : val && next
      } else {
        result = val
      }
    }

    return result
  }

  const resolve = (item) => {
    let value = item.value
    if (item.pattern) {
      value = extract(data, value)
    }
    if (item.type) value = convert(value, item.type)
    return value
  }

  return getData(index)
}

export const extract = (data, exp) => {
  let params
  if (isArray(exp)) {
    params = exp
  } else {
    params = exp.split('.')
  }
  let res = data
  params.forEach(item => {
    if (!res) return undefined
    res = res[item]
  })

  return res
}
