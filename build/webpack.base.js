'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].[contenthash:16].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: {
        loader: 'vue-loader'
      },
      include: path.resolve(__dirname, '../src')
    }, {
      test: /\.js$/,
      use: [
        'thread-loader',
        {
          loader: 'babel-loader?cacheDirectory=true'
        }
      ],
      exclude: path.resolve(__dirname, '../node_modules')
    }, {
      test: /\.css$/,
      use: [
        devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.scss$/,
      use: [
        devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      type: 'asset',
      generator: {
        filename: 'static/images/[name][hash][ext][query]'
      },
      parser: {
        dataUrlCondition: {
          maxSize: 40 * 1024
        }
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      type: 'asset',
      generator: {
        filename: 'static/fonts/[name][hash][ext][query]'
      },
      parser: {
        dataUrlCondition: {
          maxSize: 40 * 1024
        }
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: 'asset',
      generator: {
        filename: 'static/media/[name][hash][ext][query]'
      },
      parser: {
        dataUrlCondition: {
          maxSize: 40 * 1024
        }
      }
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackBar({
      name: 'webpack-vue-template',
      reporters: ['fancy']
    })
  ]
}
