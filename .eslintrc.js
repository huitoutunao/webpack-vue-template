module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        vue: 'never',
        js: 'never',
      },
    ],
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
