# Math

> Thanks to the lib [expr-eval](https://github.com/silentmatt/expr-eval) to provide the math expression parser.

```javascript
import converter from '../src/'
```

#### Basic feature

```javascript
const params = {
  a: 1,
  b: 2,
}

const result = converter.parse(params, {
  test1: ['math', '#{x * 2 + 1}', { x: '~{a}' }],
  test2: ['math', '#{x * 2 + 1}', { x: '~{q} || (Int) 2' }],
  test3: ['math', '#{(x + y) * z}', {
    x: '~{a}',
    y: '~{q} || (int) 5',
    z: function (data) {
      return data.a + data.b
    }
  }]
})

// result
{
  test1: 3,
  test2: 5,
  test3: 18,
}
```

#### Support to merge parameters

```javascript
const params = {
  a: 1,
  b: 2,
  e: 2.1111,
}

const result = converter.parse(params, {
  test1: ['math', '#{x * 2 + y * z}', { x: '~{a}' }, { y: '~{b}' }, { z: '~{e}' }],
})

// result
{
  test1: 6.2222, // 1 * 2 + 2 * 2.1111
}
```

### Takeaway

Here I list the operator that `expr-eval` supports and some pre-defined functions. Following content is copied from readme.md in [repo](https://github.com/silentmatt/expr-eval)

[Unary-operators](https://github.com/silentmatt/expr-eval#unary-operators)

Operator | Description
:------- | :----------
-x       | Negation
+x       | Unary plus. This converts it's operand to a number, but has no other effect.
x!       | Factorial (x * (x-1) * (x-2) * … * 2 * 1). gamma(x + 1) for non-integers.
abs x    | Absolute value (magnatude) of x
acos x   | Arc cosine of x (in radians)
acosh x  | Hyperbolic arc cosine of x (in radians)
asin x   | Arc sine of x (in radians)
asinh x  | Hyperbolic arc sine of x (in radians)
atan x   | Arc tangent of x (in radians)
atanh x  | Hyperbolic arc tangent of x (in radians)
ceil x   | Ceiling of x — the smallest integer that’s >= x
cos x    | Cosine of x (x is in radians)
cosh x   | Hyperbolic cosine of x (x is in radians)
exp x    | e^x (exponential/antilogarithm function with base e)
floor x  | Floor of x — the largest integer that’s <= x
length x | String length of x
ln x     | Natural logarithm of x
log x    | Natural logarithm of x (synonym for ln, not base-10)
log10 x  | Base-10 logarithm of x
not x    | Logical NOT operator
round x  | X, rounded to the nearest integer, using "gradeschool rounding"
sin x    | Sine of x (x is in radians)
sinh x   | Hyperbolic sine of x (x is in radians)
sqrt x   | Square root of x. Result is NaN (Not a Number) if x is negative.
tan x    | Tangent of x (x is in radians)
tanh x   | Hyperbolic tangent of x (x is in radians)
trunc x  | Integral part of a X, looks like floor(x) unless for negative number

[Pre-defined functions](https://github.com/silentmatt/expr-eval#pre-defined-functions)

Function     | Description
:----------- | :----------
random(n)    | Get a random number in the range [0, n). If n is zero, or not provided, it defaults to 1.
fac(n)       | n! (factorial of n: "n * (n-1) * (n-2) * … * 2 * 1") Deprecated. Use the ! operator instead.
min(a,b,…)   | Get the smallest (minimum) number in the list
max(a,b,…)   | Get the largest (maximum) number in the list
hypot(a,b)   | Hypotenuse, i.e. the square root of the sum of squares of its arguments.
pyt(a, b)    | Alias for hypot
pow(x, y)    | Equivalent to x^y. For consistency with JavaScript's Math object.
atan2(y, x)  | Arc tangent of x/y. i.e. the angle between (0, 0) and (x, y) in radians.
if(c, a, b)  | Function form of c ? a : b
roundTo(x, n)  | Rounds x to n places after the decimal point.
