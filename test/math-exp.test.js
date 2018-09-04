import test from 'ava'
import match from '../src/'

const params = {
  a: 1,
  b: 2,
  c: 'a',
  d: false,
  e: 2.1111,
}

/**
 * test for math expression
 */
test.serial('Test for math expression', (t) => {
  const result = match.parse(params, {
    test1: ['#{x * 2 + 1}', { x: '~{a}' }],
    test2: ['#{x * 2 + 1}', { x: '~{q} || (Int) 2' }],
    test3: ['#{(x + y) * z}', {
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
