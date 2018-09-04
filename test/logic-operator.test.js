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
 * test for the ||
 */
test.serial('Test for || operator', (t) => {
  const result = match.parse(params, {
    t1: '~{q} || 1',
    t2: '~{a} || 2',
  })
  t.deepEqual(result, {
    t1: '1',
    t2: 1,
  })
})

/**
 * test for the &&
 */
test.serial('Test for && operator', (t) => {
  const result = match.parse(params, {
    t1: '~{q} && 1',
    t2: '~{a} && ~{d}',
    t3: '~{a} && ~{b}'
  })
  t.deepEqual(result, {
    t1: false,
    t2: false,
    t3: 2,
  })
})

/**
 * test for the complex occasion
 */
test.serial('Test for complex ocassion with logic operator', (t) => {
  const result = match.parse(params, {
    // t1: '~{q} || ~{z} || ~{a}',
    // t2: '~{q} || ~{a} && ~{b}',
    t3: '~{a} && ~{d} || ~{c}',
    // t4: '~{q} || ~{a} || ~{z}',
  })
  t.deepEqual(result, {
    // t1: 1,
    // t2: 2,
    t3: 'a',
    // t4: 1,
  })
})
