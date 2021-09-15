module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  testEnvironment: 'jsdom',
  transform: {
    '.*\\.(vue)$': require.resolve('vue-jest'),
    '^.+\\.js$': require.resolve('babel-jest'),
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js)$',
}
