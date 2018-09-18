# Pattern Match

```javascript
import converter from '../src/'
```

#### Basic feature

```javascript
const params = {
  a: 1,
  b: 2,
  c: 'a',
}

const result = converter.parse(params, {
  d: '~{a}',
  q: '~{c}',
  a: {
    b: {
      c: '~{b}'
    }
  }
})

// result
{
  d: 1,
  q: 'a',
  a: {
    b: {
      c: 2,
    }
  }
}
```

#### Support basic value assignment

```javascript
const params = {
  a: 1,
}

const result = converter.parse(params, {
  name: '~{a}',
  test: 'test',
})

//result
{
  name: 1,
  test: 'test',
}
```

#### Support function

```javascript
const params = {
  a: 1,
  b: 2,
}

const result = converter.parse(params, {
  // data is actually the raw data sources - params
  q: function (data) {
    return data.a + data.b
  }
})

// result
{
  q: 3,
}
```

#### Support array data

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

const result = converter.parse(arrParam, {
  test1: '~{a}',
  test2: '~{b}',
  test3: function (data) {
    const res = data.d ? data.d : ''
    return res + ' test'
  },
})

// result
[{
  test1: 1,
  test2: '2',
  test3: ' test',
}, {
  test1: 2,
  test2: undefined,
  test3: '1 test',
}]
```
