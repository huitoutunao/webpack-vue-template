module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: ['airbnb-base'],
  env: {
    browser: true,
  },
};
