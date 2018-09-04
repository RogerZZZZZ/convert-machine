import test from 'ava'
import match from '../src/'

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
 * test for array data
 */
test.serial('Test for array data', (t) => {
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
