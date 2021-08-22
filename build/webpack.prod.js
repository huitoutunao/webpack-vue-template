'use strict'
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production'
})

module.exports = prodWebpackConfig
