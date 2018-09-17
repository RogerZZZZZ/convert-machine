import test from 'ava'
import converter from '../src/'

const params = {
  a: 1,
  b: 2,
  c: 'a',
}

const arrParam = [{
  a: 1,
  b: '2',
  c: false,
}, {
  a: 2,
  d: '1',
  c: true
}]

/**
 * test for the pattern param
 */
test.serial('Test for the basic pattern', (t) => {
  const result = converter.parse(params, {
    d: '~{a}',
    q: '~{c}'
  })
  t.deepEqual(result, {
    d: 1,
    q: 'a'
  })
})

/**
 * test for complex object
 */
test.serial('Test for the complex object', (t) => {
  const result = converter.parse(params, {
    obj: {
      a: '~{a}',
      b: {
        z: {
          s: '~{b}'
        }
      }
    }
  })
  t.deepEqual(result, {
    obj: {
      a: 1,
      b: {
        z: {
          s: 2,
        }
      },
    }
  })
})

/**
 * test the exp has normal default string
 */
test.serial('Test for the field with normal string value', (t) => {
  const result = converter.parse(params, {
    name: '~{a}',
    test: 'test',
  })
  t.deepEqual(result, {
    name: 1,
    test: 'test',
  })
})

/**
 * test for function param
 */
test.serial('Test for the function', (t) => {
  const result = converter.parse(params, {
    q: function (data) {
      return data.a + data.b
    }
  })
  t.deepEqual(result, {
    q: 3,
  })
})

/**
 * test for array data
 */
test.serial('Test for array data', (t) => {
  const result = converter.parse(arrParam, {
    test1: '~{a}',
    test2: '(Boolean) ~{c}',
    test3: '~{b}',
    test4: function (data) {
      const res = data.d ? data.d : ''
      return res + ' test'
    },
  })
  t.deepEqual(result, [{
    test1: 1,
    test2: false,
    test3: '2',
    test4: ' test',
  }, {
    test1: 2,
    test2: true,
    test3: undefined,
    test4: '1 test',
  }])
})
