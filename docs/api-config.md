# Configuration

```javascript
// here is the default configuration.
const config = {
  // ignore the field if its value is null of undefined.
  ignoreEmptyValue: false,
  // ignore the field if its length is 0.
  ignoreEmptyArray: false,
  // ignore the field if its equal to {}
  ignoreEmptyObject: false,
  // copy the fields that are not re-computed in raw data source to the result.
  remainUnhandlered: false,
  // make the property access chain shorter.
  shortenDataChain: false,
}
```

```javascript
// support user to DIY the config
import converter from '../src/'

converter.config({
  ignoreEmptyValue: true,
  ignoreEmptyArray: true,
  ignoreEmptyObject: true,
}).parse(/**...*/)
```

```javascript
// Parsing with default config
const arrParam = [{
  a: 1,
  b: '2',
  c: false,
}, {
  a: 2,
  d: '1',
  c: true
}]

const result = converter.parse(arrParam, {
  test1: '~{a}',
  test3: '~{b}',
})

// result
[{
  test1: 1,
  test3: '2',
}, {
  test1: 2,
  test3: undefined,
}]

// Parsing with ignoreEmpty* config
const result1 = converter.config({
  ignoreEmptyValue: true,
  ignoreEmptyArray: true,
  ignoreEmptyObject: true,
}).parse(arrParam, {
  test1: '~{a}',
  test3: '~{b}',
})

// result1
[{
  test1: 1,
  test3: '2',
}, {
  test1: 2,
}]
```

```javascript
// Support to remain unhandlered fields
const arrParam = [{
  a: 1,
  b: '2',
  c: false,
}, {
  a: 2,
  d: '1',
  c: true
}]

const result = converter.config({
  remainUnhandlered: true,
}).parse(arrParam, {
  test: '~{a}',
})

// result
[{
  test: 1,
  a: 1,
  b: '2',
  c: false,
}, {
  test: 2,
  a: 2,
  d: '1',
  c: true,
}]
```

```javascript
// Support to shorten the property access chain
const param = {
  a: 2,
  b: 11,
  c: {
    d: {
      e: {
        f: {
          g: 2,
        }
      }
    }
  }
}

const result = converter.config({
  remainUnhandlered: true,
  shortenDataChain: true,
}).parse(param, {
  c: {
    d: {
      e: {
        f: {
          g: '~{g}'
        }
      }
    }
  }
})

// result
{
  a: 2,
  b: 11,
  c: {
    d: {
      e: {
        f: {
          g: 2,
        }
      }
    }
  }
}
```