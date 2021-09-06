const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  stats: 'errors-only',
  devServer: {
    static: false,
    client: {
      logging: 'none',
      progress: true,
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    hot: true,
    port: 'auto',
    compress: true,
    open: false,
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: '/public/index.html' },
      ],
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      title: 'vue start',
      filename: 'index.html',
      template: './public/index.html',
    }),
  ],
})

module.exports = devWebpackConfig
