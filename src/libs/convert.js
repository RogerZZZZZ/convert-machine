export const convert = function convert (raw, type) {
  let res
  switch (type) {
    case 'Int':
      const val = parseInt(raw, 10)
      const isNaN = Number.isNaN(val)
      res = isNaN ? 0 : val
      break
    case 'int':
      res = parseInt(raw, 10)
      break
    case 'Float':
    case 'float':
    case 'Double':
    case 'double':
      res = parseFloat(raw, 10)
      break
    case 'Boolean':
    case 'boolean':
      res = Boolean(raw)
      break
    case 'String':
    case 's|tring':
      res = raw.toString()
      break
    default:
      break
  }
  return res
}
