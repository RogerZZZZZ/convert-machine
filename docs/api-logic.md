# Logic Operators

```javascript
import converter from '../src/'
```

#### ||

```javascript
const params = {
  a: 1,
}

const result = converter.parse(params, {
  t1: '~{q} || 1',
  t2: '~{a} || 2',
})

// result
{
  t1: '1',
  t2: 1,
}
```

#### &&

```javascript
const params = {
  a: 1,
  b: 2,
  d: false,
}

const result = converter.parse(params, {
  t1: '~{q} && 1',
  t2: '~{a} && ~{d}',
  t3: '~{a} && ~{b}'
})

// result
{
  t1: false,
  t2: false,
  t3: 2,
}
```

#### More complex case

```javascript
const params = {
  a: 1,
  b: 2,
  c: 'a',
  d: false,
}

const result = converter.parse(params, {
  t1: '~{q} || ~{z} || ~{a}',
  t2: '~{q} || ~{a} && ~{b}',
  t3: '~{a} && ~{d} || ~{c}',
  t4: '~{q} || ~{a} || ~{z}',
})

// result
{
  t1: 1,
  t2: 2,
  t3: 'a',
  t4: 1,
}
```