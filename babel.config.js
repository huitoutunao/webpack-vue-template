module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
      'vant',
    ],
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
      plugins: [
        [
          'import',
          {
            libraryName: 'vant',
            libraryDirectory: 'lib',
            style: true,
          },
          'vant',
        ],
      ],
    },
  },
}
