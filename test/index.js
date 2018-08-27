import test from 'ava'
import match from '../src/'

const params = {
  a: 1,
  b: 2,
  c: 'a',
  d: false
}

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
