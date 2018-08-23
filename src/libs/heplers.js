export const has = (obj, key) => ({}.hasOwnProperty.call(obj, key));

export const hasReg = (token) => (token && token.length && token.length >= 1);