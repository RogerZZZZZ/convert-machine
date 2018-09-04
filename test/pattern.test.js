import test from 'ava'
import match from '../src/'

const params = {
  a: 1,
  b: 2,
  c: 'a',
}

/**
 * test for the pattern param
 */
test.serial('Test for the basic pattern', (t) => {
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
 * test for complex object
 */
test.serial('Test for the complex object', (t) => {
  const result = match.parse(params, {
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
 * test for function param
 */
test.serial('Test for the function', (t) => {
  const result = match.parse(params, {
    q: function (data) {
      return data.a + data.b
    }
  })
  t.deepEqual(result, {
    q: 3,
  })
})
