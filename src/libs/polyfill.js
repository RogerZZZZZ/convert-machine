(function (global) {
  if (typeof Number.isNaN !== 'function') {
    const defineProperty = (function () {
      const obj = {}
      const $definProperty = Object.defineProperty
      let result
      try {
        result = $definProperty(obj, obj, obj) && $definProperty
      } catch (err) {}
      return result
    })()

    const globalIsNaN = global.isNaN

    const isNaN = function (value) {
      return typeof value === 'number' && globalIsNaN(value)
    }

    if (defineProperty) {
      defineProperty(Number, 'isNaN', {
        'value': isNaN,
        'configurable': true,
        'writable': true
      })
    } else {
      Number.isNaN = isNaN
    }
  }
})(this)
