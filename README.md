# webpack-vue-template

webpack5 搭建 vue2.x 项目模板。这个项目实践的目的是巩固自己对 webpack 的基础掌握，下面是记录该项目搭建的流程。

**文章还未完成......**

## 初始化

1、初始化 `package.json` 文件。
```sh
$ yarn init -y
# 或
$ npm init -y
```

关于 `package.json` 文件的字段说明，[戳这里](http://nodejs.cn/learn/the-package-json-guide#dependencies)。

2、安装 `webpack` 和 `webpack-cli`。
```sh
$ yarn add -D webpack webpack-cli
# 或
$ npm install -D webpack webpack-cli
```

- `-D` 指的是 `--save-dev`，安装开发环境所需依赖。
- `-S` 指的是 `--save`，安装生产环境所需依赖。

3、在 `src` 文件夹内创建 `main.js` 文件，文件内容如下：
```js
// ./src/main.js

console.log('Hello world!')
```

4、在根目录创建 `webpack.config.js` 文件，配置参数如下：
```js
// ./webpack.config.js

const path = require('path')

module.exports = {
  // 开发模式
  mode: 'development',

  // 入口配置
  entry: {
    app: './src/main.js'
  },

  // 输出配置
  output: {
    // 输出文件名称
    // [name] 指入口名称
    // [contenthash] 指 hash 值，默认 20 位
    filename: '[name].[contenthash:16].js',

    // 输出目录
    path: path.resolve(__dirname, 'dist')
  }
}
```

5、在 `package.json` 文件添加 `scripts` 字段如下：
```json
// ...省略代码
"scripts": {
  "build": "webpack"
},
// ...省略代码
```

运行命令 `npm run build` 可以看到已经将文件打包放在 dist 文件夹内了。

## ES6+ 转换 ES5

1、在 `package.json` 文件添加 `browserslist` 字段如下：
```json
// ...省略代码
"browserslist": [
  "> 1%", // 超过 1% 人使用的浏览器
  "last 2 versions", // 每个浏览器的最后 2 个版本（如 IE 11、IE 10）
  "not ie <= 8"
]
// ...省略代码
```

browserslist 是在不同的前端工具之间共用目标浏览器和 node 版本的配置工具，它使用 [Can I Use](https://www.caniuse.com/) 网站的数据来查询浏览器版本范围，其他字段说明可以[戳这里](https://github.com/browserslist/browserslist#queries)。

2、安装 `@babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime @babel/runtime` 依赖。
```sh
$ yarn add -D @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime
# 或
$ npm install -D @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime
```
```sh
$ yarn add @babel/runtime
# 或
$ npm install -S @babel/runtime
```

这个 `@babel/core` 是核心依赖包，webpack 转译 `.js` 底层都是通过 Node 来调用 `@babel/core` 相关功能 API 来进行的。

这个 `@babel/preset-env` 是 Babel 的智能预设，可以根据我们设定的目标环境进行针对性转码。

这个 `@babel/plugin-transform-runtime` 可以自动帮我们从辅助函数包（@babel/runtime）里引入对应函数，也可以自动移除语法转换后内联的辅助函数，减少打包体积的同时没有污染全局环境，不会有任何冲突。因此我们可以使用它来替代 [polyfill](https://www.babeljs.cn/docs/babel-polyfill) 方式。

3、根目录创建 `babel.config.json` 文件，配置参数如下：
```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}
```

这个 [@babel/plugin-transform-runtime]() 配置参数可以点击链接查看，其中 `corejs: 3` 这个参数配置需要我们安装依赖 `yarn add @babel/runtime-corejs3 或 npm install -S @babel/runtime-corejs3`，目的是对相关 API 转换功能，例如 IE 浏览器兼容 Promise。

4、配置 `webpack.config.js` 文件的 babel-loader 如下：
```js
// ...省略代码
module: {
  rules: [{
    test: /\.js$/,
    use: {
      loader: 'babel-loader' // 在前面已经安装了
    },

    // 排除 node_modules 文件夹，为了打包编译速度加快
    exclude: path.resolve(__dirname, 'node_modules')
  }]
}
```

## 识别 vue 文件

1、因为这个是 `vue2.x` 的项目模板，所以转译 vue 文件是必须的，下面是安装相关转译器：
```sh
$ yarn add vue
# 或
$ npm install -S vue
```
```sh
$ yarn add -D vue-loader vue-template-compiler
# 或
$ npm install -D vue-loader vue-template-compiler
```

在 webpack 配置如下：
```js
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  module: {
    rules: [
      // ...其它规则
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        },
        include: path.resolve(__dirname, 'src')
      },
      // ...其它规则
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

引入 `VueLoaderPlugin` 插件的目的见[官网文档](https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE)

2、在 `src` 目录下创建 `App.vue` 文件，模板如下：
```vue
<template>
  <div id="app">
    Hello World!
  </div>
</template>
```
```js
// main.js
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')
```

3、运行 `npm run webpack`，在 `dist` 文件夹创建 `index.html` 引入打包好的 `js` 文件，浏览器执行后可以看到 `Hello World!`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>vue app</title>
</head>
<body>
  <div id="app"></div>
  <script src="./app.3d3d16e9d5b60a3ee217.js"></script>
</body>
</html>
```

## 处理样式

1、安装基本依赖。
```sh
$ yarn add -D vue-style-loader css-loader
# 或
$ npm install -D vue-style-loader css-loader
```

对应的 webpack 配置如下：
```js
module: {
  rules: [
    // ...其它规则
    {
      test: /\.css$/,
      use: ['vue-style-loader', 'css-loader']
    },
    // ...其它规则
  ]
}
```

2、使用预处理器 Sass，安装相关依赖。
```sh
$ yarn add -D sass-loader node-sass
# 或
$ npm install -D sass-loader node-sass
```

对应的 webpack 配置如下：
```js
module: {
  rules: [
    // ...其它规则
    {
      test: /\.scss$/,
      use: ['vue-style-loader', 'css-loader', 'sass-loader']
    },
    // ...其它规则
  ]
}
```

## 处理静态资源

在 webpack 配置如下：
```js
module: {
  rules: [
    // ...其它规则
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      type: 'asset',
      generator: {
        filename: 'static/images/[name][hash][ext][query]'
      },
      parser: {
        dataUrlCondition: {
          maxSize: 40 * 1024 // 40kb
        }
      }
    },
    {
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
    },
    {
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
    },
    // ...其它规则
  ]
}
```

具体细节可以[戳这里](https://webpack.docschina.org/guides/asset-modules/)看官网说明。

`generator.filename` 这是输出文件路径，`[name]` 等变量可以[戳这里查看](https://webpack.docschina.org/loaders/file-loader/#placeholders)。

`parser.dataUrlCondition.maxSize` 如果一个模块源码大小小于 maxSize，那么模块会被作为一个 Base64 编码的字符串注入到包中，否则模块文件会被生成到输出的目标目录中，须要配合 `type: 'asset'` 使用，例子[见官网](https://webpack.docschina.org/guides/asset-modules/#general-asset-type)。其实添加这个配置也是为了减少资源请求。

## 创建打包模板 html 文件

前面我们看效果都是手动创建 `index.html` 文件，现在我们把这一步交给 webpack 处理，提高工程效率。

1、安装 `html-webpack-plugin` 插件。
```sh
$ yarn add -D html-webpack-plugin
# 或
$ npm install -D html-webpack-plugin
```

配置 webpack 如下：
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...其他配置
  plugins: [
    // ...其他插件
    new HtmlWebpackPlugin({
      title: 'vue start', // 标题
      filename: 'index.html', // 输出文件名
      template: './public/index.html' // 使用自定义模板
    })
  ]
}
```

2、在根目录创建 public 文件夹存放 `index.html` 文件。
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

这个模板根据你项目实际情况可以修改，其中 `<%= htmlWebpackPlugin.options.title %>` 这个是配置动态网页标题。

## 开发服务器

每次打包后都需要手动的点击生成的 `index.html` 看效果，为了提高工程效率，我们把这一步交给 webpack 来处理。

1、安装依赖 `webpack-dev-server`。
```sh
$ yarn add -D webpack-dev-server
# 或
$ npm install -D webpack-dev-server
```

配置 webpack 如下：
```js
module.exports = {
  // ...其他配置
  target: 'web',
  devServer: {
    hot: true,
    port: 8080,
    open: false,
    progress: true,
    contentBase: './dist'
  },
  // ...其他配置
}
```

`package.json` 添加启动服务命令：
```json
{
  // ...省略代码
  "scripts": {
    "serve": "webpack serve --inline",
    "build": "webpack"
  },
  // ...省略代码
}
```

[issuer](https://github.com/webpack/webpack-dev-server/issues/2758)
[chalk](https://www.npmjs.com/package/chalk)
[portfinder](https://www.npmjs.com/package/portfinder)

## 结语

以这个项目为例，说下我对安装依赖包的理解，具体这个依赖包是该安装在开发环境还是生产环境。

开发环境：
- 样式预处理器或其他文件的转译器，webpack 使用到的 loader 或 plugin。
- 类似 eslint 等代码规范检查工具依赖包。
- webpack 打包工具。

生产环境：
- Vue 框架（vue，vue-router，vuex）
- UI 库
- axios 请求库
- 等等

## 参考文献

- [深入浅出 Webpack](https://webpack.wuhaolin.cn/)
- [从零使用 Webpack5 搭建一个完整的 Vue3 的开发环境](https://juejin.cn/post/6924180659829211143)
