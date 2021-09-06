module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
      optionalDependencies: false,
      peerDependencies: false,
    }],
    'import/extensions': ['error', 'ignorePackages', {
      vue: 'never',
      js: 'never',
    }],
    semi: ['error', 'never'],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './build/webpack.base.js',
      },
    },
  },
}
