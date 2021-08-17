const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
  target: 'web',
  devServer: {
    hot: true,
    port: 8080,
    open: false,
    progress: true,
    contentBase: './dist'
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
    new HtmlWebpackPlugin({
      title: 'vue start',
      filename: 'index.html',
      template: './public/index.html'
    })
  ]
}
