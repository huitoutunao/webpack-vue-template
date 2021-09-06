const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const baseWebpackConfig = require('./webpack.base')

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: path.posix.join('js', '[name].[chunkhash].js'),
    chunkFilename: path.posix.join('js', '[id].[chunkhash].js'),
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          toplevel: true,
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      title: 'vue start',
      filename: 'index.html',
      template: './public/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:16].css',
      chunkFilename: 'css/[name].[contenthash:16].css',
    }),
  ],
  performance: {
    hints: 'error',
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
  },
})

module.exports = prodWebpackConfig
