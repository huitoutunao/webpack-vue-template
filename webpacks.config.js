const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

let webpackConfig = {
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
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    webpackConfig.devtool = 'eval-cheap-module-source-map'
    webpackConfig.target = 'web'
    webpackConfig.devServer = {
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
    }
    webpackConfig.plugins = [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        title: 'vue start',
        filename: 'index.html',
        template: './public/index.html'
      })
    ]
  }

  if (argv.mode === 'production') {
    console.log('production')
  }

  return webpackConfig
}
