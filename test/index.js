import test from 'ava'
import match from '../src/'

const params = {
  a: 1,
  b: 2,
  c: 'a',
}

/**
 * test for the object param
 */
test.serial('Object test', (t) => {
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
  console.log(result)
  t.deepEqual(result, {
    q: 3,
  })
})
