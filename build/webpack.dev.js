'use strict'
const path = require('path')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  stats: 'errors-only',
  devServer: {
    static: false,
    client: {
      logging: 'none',
      progress: true,
      overlay: {
        warnings: false,
        errors: true
      }
    },
    hot: true,
    port: 8080,
    compress: true,
    open: false,
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
