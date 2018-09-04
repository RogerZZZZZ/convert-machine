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
 * test fot the value without type convert
 */
test.serial('Test for value without type convert sign', (t) => {
  const result = match.parse(params, {
    t1: '1',
    t2: '~{a}'
  })
  t.deepEqual(result, {
    t1: '1',
    t2: 1,
  })
})

/**
 * test for type convert
 */
test.serial('Test for type convert', (t) => {
  const result = match.parse(params, {
    t1: '(Boolean) 1',
    t2: '(Int) 2',
    t3: '(Boolean) ~{a}',
    t4: '(Int) ~{e}',
    t5: '(String) ~{b}'
  })
  t.deepEqual(result, {
    t1: true,
    t2: 2,
    t3: true,
    t4: 2,
    t5: '2',
  })
})
