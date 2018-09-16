import {
  appendArr,
  mixObj,
} from '../libs/helpers'

const pattReg = /~\{(.*)\}/
const strReg = /(?:(.*?)(\|\||(?:&&)))|(.+)/gi
const typeReg = /\((.*)\)(.+)/
const mathReg = /#\{(.*)\}/

const buildRes = (type, data) => {
  return {
    type,
    data,
  }
}

export const arrParser = (data) => {
  const expVal = data.shift()
  const mathExp = mathReg.exec(expVal)
  let exp = ''
  let param = {}
  if (mathExp && mathExp[1]) {
    exp = mathExp[1]
    param = mixObj([...data])
  }
  return buildRes('math', { exp, param })
}

export const paramParser = (data) => {
  let paramsArr = []
  let rs = strReg.exec(data)
  while (rs) {
    const obj = {}
    const split = rs[2]

    if (split) {
      obj.split = split
    }
    const val = rs[1] ? rs[1] : rs[0]

    let value = val.trim()

    const type = typeReg.exec(value)
    if (type && type[1] && type[2]) {
      value = type[2].trim()
      obj.type = type[1].trim()
    }

    const isPattern = pattReg.exec(value)
    if (isPattern) {
      value = isPattern[1].trim()
      obj.pattern = true
    }

    obj.value = value

    paramsArr = appendArr(obj, paramsArr)
    rs = strReg.exec(data)
  }
  return buildRes('param', paramsArr)
}
