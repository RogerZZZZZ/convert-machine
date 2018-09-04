module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    "comma-dangle": ["error", "only-multiline"],
    "no-var": "error",
    "operator-linebreak": ["error", "before"],
  },
  globals: {
    logger:false
  }
};
