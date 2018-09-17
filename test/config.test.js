import test from 'ava'
import converter from '../src/'

const arrParam = [{
  a: 1,
  b: '2',
  c: false,
}, {
  a: 2,
  d: '1',
  c: true
}]

const param = {
  a: 2,
  b: 11,
  c: {
    d: {
      e: {
        f: {
          g: 2,
        }
      }
    }
  }
}

/**
 * test for parse with default config
 */
test.serial('Test for parsing with defualt config', (t) => {
  const result = converter.parse(arrParam, {
    test1: '~{a}',
    test3: '~{b}',
  })
  t.deepEqual(result, [{
    test1: 1,
    test3: '2',
  }, {
    test1: 2,
    test3: undefined,
  }])
})

/**
 * test for basic config
 */
test.serial('Test for parsing with customize config', (t) => {
  const result = converter.config({
    ignoreEmptyValue: true,
    ignoreEmptyArray: true,
    ignoreEmptyObject: true,
  }).parse(arrParam, {
    test1: '~{a}',
    test3: '~{b}',
  })
  t.deepEqual(result, [{
    test1: 1,
    test3: '2',
  }, {
    test1: 2,
  }])
})

/**
 * test for remain unhandlered fields in array
 */
test.serial('Test for remaining the unhandlered fields in array', (t) => {
  const result = converter.config({
    remainUnhandlered: true,
  }).parse(arrParam, {
    test: '~{a}',
  })
  t.deepEqual(result, [{
    test: 1,
    a: 1,
    b: '2',
    c: false,
  }, {
    test: 2,
    a: 2,
    d: '1',
    c: true,
  }])
})

/**
 * test for remain unhandlered fields in object
 */
test.serial('Test for remaining the unhandlered fields in object', (t) => {
  const result = converter.config({
    remainUnhandlered: true,
  }).parse(param, {
    test: '~{a}',
    c: {
      d: {
        e: {
          f: {
            z: '~{c.d.e.f.g}',
          }
        }
      }
    }
  })
  t.deepEqual(result, {
    test: 2,
    a: 2,
    b: 11,
    c: {
      d: {
        e: {
          f: {
            g: 2,
            z: 2,
          }
        }
      }
    }
  })
})

/**
 * test for shortenDataChain config
 */
test.serial('Test for shortenDataChain config', (t) => {
  const result = converter.config({
    remainUnhandlered: true,
    shortenDataChain: true,
  }).parse(param, {
    c: {
      d: {
        e: {
          f: {
            g: '~{g}'
          }
        }
      }
    }
  })
  t.deepEqual(result, {
    a: 2,
    b: 11,
    c: {
      d: {
        e: {
          f: {
            g: 2,
          }
        }
      }
    }
  })
})
