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
 * test for parse with default config
 */
test.serial('Test for parsing with defualt config', (t) => {
  const result = match.parse(arrParam, {
    test1: '~{a}',
    test3: '~{b}',
  })
  t.deepEqual(result, [{
    test1: 1,
    test3: '2',
  }, {
    test1: 2,
    test3: undefined,
  }])
})

/**
 * test for basic config
 */
test.serial('Test for parsing with customize config', (t) => {
  const result1 = match.config({
    ignoreEmptyValue: true,
    ignoreEmptyArray: true,
    ignoreEmptyObject: true,
  }).parse(arrParam, {
    test1: '~{a}',
    test3: '~{b}',
  })
  t.deepEqual(result1, [{
    test1: 1,
    test3: '2',
  }, {
    test1: 2,
  }])
})
