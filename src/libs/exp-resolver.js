import {
  convert
} from './convert'

export const expsResolve = (data, arr) => {
  let index = 0

  const getData = (idx) => {
    let result

    if (arr[idx]) {
      const val = resolve(arr[idx])
      const next = getData(idx + 1)
      const split = arr[idx].split

      if (split === '||') {
        result = val === undefined ? next : val
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
  const params = exp.split('.')
  let res = data
  params.forEach(item => {
    res = res[item]
  })

  return res
}
