const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: {
        loader: 'vue-loader'
      },
      include: path.resolve(__dirname, 'src')
    }, {
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: path.resolve(__dirname, 'node_modules')
    }, {
      test: /\.css$/,
      use: ['vue-style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: ['vue-style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
