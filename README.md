# webpack-vue-template

webpack5 搭建 vue2.x 项目模板。这个项目实践的目的是巩固自己对 webpack 的基础掌握，下面是记录该项目搭建的流程。

**文章还未完成......**

## 初始化

1、初始化 `package.json` 文件。
```sh
yarn init -y
或
npm init -y
```

关于 `package.json` 文件的字段说明，[戳这里](http://nodejs.cn/learn/the-package-json-guide#dependencies)。

2、安装 `webpack` 和 `webpack-cli`
```sh
yarn add -D webpack webpack-cli
或
npm install -D webpack webpack-cli
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
  "last 2 versions" // 每个浏览器的最后 2 个版本（如 IE 11、IE 10）
]
// ...省略代码
```

browserslist 是在不同的前端工具之间共用目标浏览器和 node 版本的配置工具，它使用 [Can I Use](https://www.caniuse.com/) 网站的数据来查询浏览器版本范围，其他字段说明可以[戳这里](https://github.com/browserslist/browserslist#queries)。

2、安装 `@babel/core babel-loader @babel/preset-env` 依赖
```sh
yarn add -D @babel/core babel-loader @babel/preset-env
或
npm install -D @babel/core babel-loader @babel/preset-env
```

这个 `@babel/core` 是核心依赖包，webpack 转译 `.js` 底层都是通过 Node 来调用 `@babel/core` 相关功能 API 来进行的。

这个 `@babel/preset-env` 是 Babel 的智能预设，可以根据我们设定的目标环境进行针对性转码。

3、根目录创建 `babel.config.json` 文件，配置参数如下：
```json
{
  "presets": ["@babel/preset-env"],
  "plugins": []
}
```

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
