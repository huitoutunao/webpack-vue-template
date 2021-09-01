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

