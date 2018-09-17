# Pattern Match

```javascript
import converter from '../src/'
```

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

```javascript
// if the value is just plain text, then assign the text value to field.
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

```javascript
// Support function. The parameter 'data' in function is the raw data sources. i.e 'params' in this case.
const params = {
  a: 1,
  b: 2,
}

const result = converter.parse(params, {
  q: function (data) {
    return data.a + data.b
  }
})

// result
{
  q: 3,
}
```

```javascript
// if the data is an array
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
