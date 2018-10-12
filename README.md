# Convert Machine

This simple lib is designed for you to convert the raw data into the format you really need.

[Project repo](https://github.com/RogerZZZZZ/convert-machine)

## API docs

There are more api that are given by this lib. 

[docs link](https://rogerzzzzz.github.io/convert-machine/)

## Quick Start

### Installation

Simply install by `npm`

```shell
$ npm i convert-machine --save-dev
```

```shell
<!-- build -->
$ npm run build

<!-- run test -->
$ npm test
```

## Example

**Basic methods**

```javascript
import converter from 'convert-machine'

const params = {
  a: 1,
  b: 'a',
  c: false,
  g: '2',
  h: [{
    d: 3,
    e: 4,
  }, {
    d: 4,
    f: 5
  }],
  f: {
    i: {
      z: 2
    }
  },
}

const result = converter.parse(params, {
  // support basic variable assignment
  a: '~{a}',
  a1: '~{f.i.z}',

  // support type casting
  b: '(int) ~{g}',

  // function support. the parameter 'data' is the inputted data source
  c: function (data) {
    return data.a + 1
  },

  // support logic operator
  d: '~{c} || ~{a}',
  e: '~{g} && ~{b} && (String) ~{a}',

  // support math expression
  f: ['math', '#{x * 2 + 3 * y}', {x: '~{a}'}, {y: '(Int) ~{g}'}],

  // support to handler array type field.
  h: ['array', {
    t1: '~{e}'
  }],
})

// result
console.log(result)
/**
{
  a: 1,
  a1: 2,
  b: 2,
  c: 2,
  d: 1,
  e: '1',
  f: 8,
  h: [{
    t1: 4
  }, {
    t1: undefined
  }]
}
*/
```

**Some Additional Configuration**

- **ignoreEmptyValue**, ignore the field if its value is null of undefined.
- **ignoreEmptyArray**, ignore the field if its length is 0.
- **ignoreEmptyObject**, ignore the field if its equal to {}
- **remainUnhandlered**, copy the fields that are not re-computed in raw data source to the result.
- **shortenDataChain**, make the property access chain shorter.

##### shortenDataChain example:

```javascript
const param = {
  a: {
    b: {
      c: {
        d: 1
      }
    }
  }
}

//normal occasion
{
  a: {
    b: {
      c: {
        d: '~{a.b.c.d}'
      }
    }
  }
}

// shortenDataChain set to true
{
  a: {
    b: {
      c: {
        d: '~{d}'
      }
    }
  }
}
```

## Finally
If there is any question or bug during you using it. Please feel free to ask me or just create a issue.

If the small tool gives some help to you. Please give me a star to encourage me ~ Thank you very much.

## License
MIT