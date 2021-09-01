# vue2-mobile-template

在这个[模板基础](https://github.com/huitoutunao/webpack-vue-template)上，配置移动端开发的初始模板。

## 安装 vant 组件库

[vant官方文档](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart)
```sh
yarn add vant
或
npm install -S vant
```

按需引入组件，我们还需要安装 babel-plugin-import 插件。
```sh
yarn add -D babel-plugin-import
或
npm install -D babel-plugin-import
```

`babel.config.json` 文件添加配置如下：
```json
{
  // ..。其他配置
  ["import", {
    "libraryName": "vant",
    "libraryDirectory": "es",
    "style": true
  }, "vant"]
}
```

## 浏览器适配

这里使用 Viewport 布局。安装 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md) 依赖。

```sh
yarn add -D postcss-loader postcss postcss-px-to-viewport
或
npm install -D postcss-loader postcss postcss-px-to-viewport
```

根目录创建 `postcss.config.js`
```js
module.exports = {
  plugins: [
    ['postcss-px-to-viewport', {
      viewportWidth: 375
    }]
  ]
}
```

在 `webpack.base.js` 添加配置如下：
```js
module.exports = {
  // ...其他配置
  module: {
    rules: [
    // ...其他配置
    {
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
    },
    // ...其他配置
    ]
  }
}
```

