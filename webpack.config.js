const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].[contenthash:16].js',
    path: path.resolve(__dirname, 'dist')
  }
}
