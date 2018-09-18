# Type Cast

```javascript
import converter from '../src/'

const params = {
  a: 1,
  b: 2,
  e: 2.1111,
}

const result = converter.parse(params, {
  t1: '(Boolean) 1',
  t2: '(Int) 2',
  t3: '(Boolean) ~{a}',
  t4: '(Int) ~{e}',
  t5: '(String) ~{b}'
})

// result
{
  t1: true,
  t2: 2,
  t3: true,
  t4: 2,
  t5: '2',
}
```
