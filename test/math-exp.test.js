import test from 'ava'
import converter from '../src/'

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
  const result = converter.parse(params, {
    test1: ['math', '#{x * 2 + 1}', { x: '~{a}' }],
    test2: ['math', '#{x * 2 + 1}', { x: '~{q} || (Int) 2' }],
    test3: ['math', '#{(x + y) * z}', {
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
