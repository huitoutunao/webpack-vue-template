# webpack-vue-template

webpack5 搭建 vue2.x 项目模板。这个项目实践的目的是巩固自己对 webpack 的掌握，下面是记录该项目搭建的流程。

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
