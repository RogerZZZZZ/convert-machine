# Configuration

#### Default configuration

```javascript
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

#### Support to inject own configuration

```javascript
import converter from '../src/'

converter.config({
  ignoreEmptyValue: true,
  ignoreEmptyArray: true,
  ignoreEmptyObject: true,
}).parse(/**...*/)
```

#### Parse with default configuration

```javascript
const arrParam = [{
  a: 1,
  b: '2',
  c: [],
  d: {},
}, {
  a: 2,
}]

const result = converter.parse(arrParam, {
  test1: '~{a}',
  test2: '~{b}',
  test3: '~{c}',
  test4: '~{d}',
})

// result
[{
  test1: 1,
  test2: '2',
  test3: [],
  test4: {},
}, {
  test1: 2,
  test2: undefined,
  test3: undefined,
  test4: undefined,
}]
```

#### ignoreEmpty*

```javascript
const result1 = converter.config({
  ignoreEmptyValue: true,
  ignoreEmptyArray: true,
  ignoreEmptyObject: true,
}).parse(arrParam, {
  test1: '~{a}',
  test2: '~{b}',
})

// result1
[{
  test1: 1,
  test2: '2',
}, {
  test1: 2,
}]
```

#### remainUnhandlered

```javascript
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

#### shortenDataChain

```javascript
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