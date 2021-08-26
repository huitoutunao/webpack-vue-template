'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
        process.env.NODE_ENV !== 'production'
          ? 'vue-style-loader'
          : MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }, {
      test: /\.scss$/,
      use: [
        process.env.NODE_ENV !== 'production'
          ? 'vue-style-loader'
          : MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:16].css',
      chunkFilename: 'css/[name].[contenthash:16].css'
    })
  ]
}
