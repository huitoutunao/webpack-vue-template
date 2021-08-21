'use strict'
const path = require('path')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  devServer: {
    clientLogLevel: 'none',
    host: '0.0.0.0',
    hot: true,
    port: 8080,
    open: false,
    progress: true,
    compress: true,
    useLocalIp: true,
    contentBase: './dist',
    stats: 'errors-only',
    overlay: {
      warnings: false,
      errors: true
    },
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: '/public/index.html' }
      ]
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue start',
      filename: 'index.html',
      template: './public/index.html'
    })
  ]
})

module.exports = devWebpackConfig
