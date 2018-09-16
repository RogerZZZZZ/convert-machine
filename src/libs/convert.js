import { pipeline } from './condition-pipeline'

const isInteger = (v) => v === 'Int'

const isInt = (v) => v === 'int'

const isFloat = (v) => {
  return v === 'Float'
        || v === 'float'
        || v === 'Double'
        || v === 'double'
}

const isBoolean = (v) => {
  return v === 'Boolean'
        || v === 'boolean'
}

const isString = (v) => {
  return v === 'String'
        || v === 'string'
}

export const convert = function convert (raw, type) {
  return pipeline(type, raw)
    .on(isInteger, d => {
      const val = parseInt(d, 10)
      const isNaN = Number.isNaN(val)
      return isNaN ? 0 : val
    })
    .on(isInt, d => parseInt(d))
    .on(isFloat, d => parseFloat(d))
    .on(isBoolean, d => Boolean(d))
    .on(isString, d => d.toString())
    .default(d => d.toString())
}
