import test from 'ava'
import match from '../src/'

const params = {
  a: 1,
  b: 2,
  c: 'a',
  d: false,
  e: 2.1111,
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
test.serial('Pattern test', (t) => {
  const result = match.parse(params, {
    d: '~{a}',
    q: '~{c}'
  })
  t.deepEqual(result, {
    d: 1,
    q: 'a'
  })
})

/**
 * test for function param
 */
test.serial('Function test', (t) => {
  const result = match.parse(params, {
    q: function (data) {
      return data.a + data.b
    }
  })
  t.deepEqual(result, {
    q: 3,
  })
})

/**
 * test for object chain
 */
test.serial('Object test', (t) => {
  const result = match.parse(params, {
    obj: {
      a: '~{a}',
      b: function (data) {
        return data.a + data.b
      }
    }
  })
  t.deepEqual(result, {
    obj: {
      a: 1,
      b: 3,
    }
  })
})

/**
 * test the exp has normal default string
 */
test.serial('Normal String test', (t) => {
  const result = match.parse(params, {
    name: '~{a}',
    test: 'test',
  })
  t.deepEqual(result, {
    name: 1,
    test: 'test',
  })
})

/**
 * test for the ||
 */
test.serial('|| test', (t) => {
  const result = match.parse(params, {
    test1: '~{q} || 1',
    test2: '~{a} || 2',
  })
  t.deepEqual(result, {
    test1: '1',
    test2: 1,
  })
})

/**
 * test for the &&
 */
test.serial('&& test', (t) => {
  const result = match.parse(params, {
    test1: '~{q} && 1',
    test2: '~{a} && ~{d}',
    test3: '~{a} && ~{b}'
  })
  t.deepEqual(result, {
    test1: false,
    test2: false,
    test3: 2,
  })
})

/**
 * test for type convert
 */
test.serial('type convert test', (t) => {
  const result = match.parse(params, {
    test1: '(Boolean) 1',
    test2: '(Int) 2',
    test3: '(Boolean) ~{a}',
    test4: '(Int) ~{e}',
    test5: '(String) ~{b}'
  })
  t.deepEqual(result, {
    test1: true,
    test2: 2,
    test3: true,
    test4: 2,
    test5: '2',
  })
})

/**
 * test for array data
 */
test.serial('array data test', (t) => {
  const result = match.parse(arrParam, {
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

/**
 * test for math expression
 */
test.serial('math expression test', (t) => {
  const result = match.parse(params, {
    test1: ['${x * 2 + 1}', { x: '~{a}' }],
    test2: ['${x * 2 + 1}', { x: '~{q} || (Int) 2' }],
    test3: ['${(x + y) * z}', {
      x: '~{a}',
      y: '~{q} || (int) 5',
      z: function (data) {
        return data.a + data.b
      }
    }]
  })
  t.deepEqual(result, {
    test1: 3,
    test2: 5,
    test3: 18,
  })
})
