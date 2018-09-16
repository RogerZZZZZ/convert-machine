const matched = x => ({
  on: () => matched(x),
  default: () => x,
})

export const pipeline = (x, y = x) => ({
  on: (pref, fn) => (pref(x) ? matched(fn(y)) : pipeline(x, y)),
  default: fn => fn(y),
})
