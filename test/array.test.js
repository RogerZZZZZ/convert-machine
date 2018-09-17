import test from 'ava'
import match from '../src/'

const param = {
  a: 1,
  b: [{
    c: 1,
    d: 2,
  }, {
    c: 3,
    d: 2,
    e: 4,
  }],
  g: 10,
}

const param1 = {
  b: [{
    c: [{
      q: 1,
      w: 2,
    }],
    d: 2,
  }, {
    c: [{
      q: 2,
      w: 3,
    }, {
      q: 4,
      w: 5,
    }],
    d: 2,
    e: 4,
  }],
}

/**
 * test for array field
 */
test.serial('Test for array list field', (t) => {
  const result = match.parse(param, {
    a: '~{g}',
    b: ['array', {
      c: '~{c}',
      d: '~{e}',
      f: function (d) {
        return d.c + d.d
      },
    }]
  })

  t.deepEqual(result, {
    a: 10,
    b: [{
      c: 1,
      d: undefined,
      f: 3,
    }, {
      c: 3,
      d: 4,
      f: 5,
    }]
  })
})

/**
 * test for complex array field
 */
test.serial('Test for complex array list field', (t) => {
  const result = match.parse(param1, {
    b: ['array', {
      d: '~{e}',
      e: '~{d}',
      c: ['array', {
        q: '~{q}',
        w: function (d) {
          return d.q + d.w
        }
      }]
    }]
  })

  t.deepEqual(result, {
    b: [{
      c: [{
        q: 1,
        w: 3,
      }],
      d: undefined,
      e: 2,
    }, {
      c: [{
        q: 2,
        w: 5,
      }, {
        q: 4,
        w: 9,
      }],
      d: 4,
      e: 2,
    }],
  })
})
