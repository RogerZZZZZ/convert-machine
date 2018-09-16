const matched = x => ({
  on: () => matched(x),
  default: () => x,
})

export const pipeline = x => ({
  on: (pref, fn) => (pref(x) ? matched(fn(x)) : pipeline(x)),
  default: fn => fn(x),
})
