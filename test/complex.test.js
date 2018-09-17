import test from 'ava'
import converter from '../src/'

const params = {
  a: 1,
  b: 'a',
  c: false,
  g: '2',
  h: [{
    d: 3,
    e: 4,
  }, {
    d: 4,
    f: 5
  }],
}

/**
 * test for complex ocassion
 */
test.serial('test for complex ocassion', (t) => {
  const result = converter.parse(params, {
    a: '~{a}',

    b: '(int) ~{g}',

    c: function (data) {
      return data.a + 1
    },

    d: '~{c} || ~{a}',

    e: '~{g} && ~{b} && (String) ~{a}',

    f: ['math', '#{x * 2 + 3 * y}', {x: '~{a}'}, {y: '(Int) ~{g}'}],

    h: ['array', {
      t1: '~{e}'
    }],
  })

  t.deepEqual(result, {
    a: 1,
    b: 2,
    c: 2,
    d: 1,
    e: '1',
    f: 8,
    h: [{
      t1: 4
    }, {
      t1: undefined
    }]
  })
})
