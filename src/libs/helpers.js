const has = (obj, key) => ({}.hasOwnProperty.call(obj, key))

const appendArr = (item, arr) => {
  if (arr && arr.length) {
    arr.push(item)
    return arr
  }
  return [item]
}

module.exports = {
  has,
  appendArr,
}
