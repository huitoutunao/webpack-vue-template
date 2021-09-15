# vue2-mobile-template

在这个[模板基础](https://github.com/huitoutunao/webpack-vue-template)上，配置移动端开发的初始模板。

## 安装 vant 组件库

[vant 官方文档](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart)

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
    [
      'postcss-px-to-viewport',
      {
        viewportWidth: 375,
      },
    ],
  ],
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
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      // ...其他配置
    ],
  },
}
```

## 代码规范

### ESLint

1、安装 `eslint eslint-plugin-import` 依赖。

```sh
yarn add -D eslint eslint-plugin-import
或
npm install -D eslint eslint-plugin-import
```

2、使用 Airbnb 的 ESLint 扩展。

```sh
yarn add -D eslint-config-airbnb-base
或
npm install -D eslint-config-airbnb-base
```

3、根目录创建文件 `.eslintrc.js`，这是应用校验规则的配置文件。

安装解析器 `@babel/eslint-parser`，该依赖包允许你使用 JavaScript 实验特性的时候，依然能够用上 Eslint 语法检查。

```sh
yarn add -D @babel/eslint-parser
或
npm install -D @babel/eslint-parser
```

```js
module.exports = {
  root: true,

  // 解析器
  parser: '@babel/eslint-parser',

  // 解析选项
  parserOptions: {
    // 支持 ECMAScript 的版本
    ecmaVersion: 6,

    // 默认 script。如果你的代码是 ECMAScript 模块，可以使用 module 类型
    sourceType: 'module',
  },

  // 扩展
  extends: ['airbnb-base'],

  // 一个环境定义了一组预定义的全局变量
  env: {
    // 浏览器环境中的全局变量
    browser: true,
  },

  // 定义校验规则
  rules: {
    // 修改 require 引入文件警告，参考链接：https://github.com/import-js/eslint-plugin-import/blob/v2.24.2/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],

    // 禁止在语句末尾使用分号 (除了消除以 [、(、/、+ 或 - 开始的语句的歧义)
    semi: ['error', 'never'],
  },
}
```

4、对 vue 文件的代码进行检查。

```sh
yarn add -D eslint-plugin-vue vue-eslint-parser eslint-import-resolver-webpack
或
npm install -D eslint-plugin-vue vue-eslint-parser eslint-import-resolver-webpack
```

修改 `.eslintrc.js` 配置文件如下：

```js
module.exports = {
  // ...其他配置
  // 配置参考 vue 官方文档：https://eslint.vuejs.org/user-guide/#usage
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: ['airbnb-base', 'plugin:vue/recommended'],
  rules: {
    // ...其他配置
    // 省略文件扩展名 https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        vue: 'never',
        js: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      // 使用 webpack 配置的路径别名 https://github.com/import-js/eslint-plugin-import/blob/main/resolvers/webpack/README.md
      webpack: {
        config: './build/webpack.base.js',
      },
    },
  },
  // ...其他配置
}
```

修改 `package.json` 文件如下：

```json
"scripts": {
  // ...其他命令
  "lint": "eslint --fix --ext .js build --ext .js,.vue src" // 这个是检查 src 目录下的 js 和 vue 文件。https://eslint.org/docs/user-guide/command-line-interface
},
```

5、根目录创建 `.eslintignore`，这是配置忽略校验规则的文件。

```
/public
/dist
/node_modules
```

### 集成 husky 和 lint-staged

上面检查代码是需要手动执行 lint 才有效，这样就有可能忘记或者干脆把自己那一套代码风格提交到仓库，那么前面配置的 eslint 将失去它的意义，所以在 git 提交代码前强制执行代码风格检查，如果不合规范，就不允许提交。

1、安装 husky 和 lint-staged。

```sh
yarn add -D husky lint-staged
或
npm install -D husky lint-staged
```

2、配置 husky 相关文件，[参考官网](https://typicode.github.io/husky/#/?id=features)运行如下命令：

```sh
yarn husky install

npx husky add .husky/pre-commit "npx lint-staged"
```

根目录就会出现 `.husky/pre-commit` 等文件，文件内容如下：

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

3、配置 lint-staged。

```json
"scripts": {
  // ...省略
  "prepare": "husky install"
},
"lint-staged": {
  "*.{vue,js}": "eslint --fix" // 检测并修复待提交的 vue 和 js 文件
},
```

### 集成 Prettier 配置

[参考官网](https://prettier.io/docs/en/install.html)

1、安装依赖。

```sh
yarn add --dev --exact prettier
或
npm install --save-dev --save-exact prettier
```

2、根目录创建配置文件 `.prettierrc.json` 和 `.prettierignore`，[配置项相关说明](https://prettier.io/docs/en/options.html)。

```json
// .prettierrc.json

{
  "useTabs": false, // 使用制表符替代空格缩进
  "tabWidth": 2, // 每个缩进级别是 2 个空格
  "printWidth": 88, // 每行代码不能超出 88 个字符
  "singleQuote": true, // 将所有双引号替换成单引号
  "trailingComma": "es5", // 尾随逗号
  "bracketSpacing": true, // 自动为对象字面量之间添加空格
  "semi": false // 在语句末尾打印分号
}
```

```json
// .prettierignore

# Ignore artifacts:
.vscode
dist
```

3、在 `package.json` 文件添加格式化命令：

```json
"scripts": {
    // ...省略
    "format": "npx prettier --write ./src",
  },
```

4、解决 eslint 和 prettier 的配置冲突。

4-1、安装两个依赖：

- eslint-plugin-prettier：将 Prettier 的规则设置到 ESLint 的规则中。
- eslint-plugin-prettier：关闭 ESLint 中与 Prettier 中会发生冲突的规则。

优先级：Prettier 配置规则 > ESLint 配置规则

```sh
yarn add -D eslint-plugin-prettier eslint-config-prettier
或
npm install -D eslint-plugin-prettier eslint-config-prettier
```

4-2、在 `.eslintrc.js` 文件配置如下：

```js
module.exports = {
  // ...省略
  extends: ['plugin:vue/recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  // ...省略
}
```

### 集成 stylelint 配置

1、安装 stylelint、stylelint-scss、stylelint-order、 [stylelint-config-airbnb](https://github.com/airbnb/css)、stylelint-prettier 和 stylelint-config-prettier。
```sh
yarn add -D stylelint stylelint-scss stylelint-order stylelint-config-airbnb stylelint-prettier stylelint-config-prettier
或
npm install D stylelint stylelint-scss stylelint-order stylelint-config-airbnb stylelint-prettier stylelint-config-prettier
```

`stylelint-config-prettier`：解决 stylelint 和 Prettier 的冲突。

这里有一份样式属性顺序[规范](https://github.com/stormwarning/stylelint-config-recess-order)，可以根据实际需求配置。

2、配置相关规则文件：
```json
// .stylelintrc.json

{
  "extends": ["stylelint-config-airbnb", "stylelint-prettier/recommended"],
  "rules": {
    "prettier/prettier": true,
    "max-nesting-depth": 20, // 最深嵌套 20 层
    "color-hex-case": "lower", // 颜色值使用小写
    "color-hex-length": "short" // 颜色值尽可能短
  }
}
```
```json
// .stylelintignore

# .stylelintignore
# 测试和打包目录
test/
dist/
```
```json
// package.json

{
  // ...省略
  "scripts": {
    "lint:css": "stylelint **/*.{vue,htm,html,css,sss,less,scss,sass}",
  },
  "lint-staged": {
    "**/*.{vue,htm,html,css,sss,less,scss,sass}": "stylelint --fix"
  },
  // ...省略
}
```

## 单元测试

参考资料：
- [vue-test-utils](https://vue-test-utils.vuejs.org/zh/)
- [jest](https://www.jestjs.cn/docs/getting-started)
- [vue-jest](https://github.com/vuejs/vue-jest)

1、安装相关依赖
```sh
yarn add -D jest @vue/test-utils vue-jest babel-core@^7.0.0-bridge.0 babel-jest @types/jest eslint-plugin-jest
或
npm install -D jest @vue/test-utils vue-jest babel-core@^7.0.0-bridge.0 babel-jest @types/jest eslint-plugin-jest
```

2、根目录创建 `jest.config.js` 文件。
```js
module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  testEnvironment: 'jsdom',
  transform: {
    '.*\\.(vue)$': require.resolve('vue-jest'),
    '^.+\\.js$': require.resolve('babel-jest'),
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js)$',
}
```

3、修改 `babel.config.js` 文件。
```js
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
      'vant',
    ],
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
      plugins: [
        [
          'import',
          {
            libraryName: 'vant',
            libraryDirectory: 'lib',
            style: true,
          },
          'vant',
        ],
      ],
    },
  },
}
```

4、修改 `.eslintrc.js` 文件。
```js
module.exports = {
  // ...省略配置
  extends: [
    // ...省略配置
    'plugin:jest/recommended',
  ],
}
```

5、创建 `Test.vue` 文件。
```vue
<template>
  <div class="test-page">
    <div class="page-title">Unit Test Page</div>
    <p>count is: {{ count }}</p>
    <button @click="increment">increment</button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    increment() {
      this.count += 1
    },
  },
}
</script>

<style lang="scss" scoped>
.page-title {
  font-size: 16px;
  color: #333;
}
</style>
```

6、创建 `__tests__/jestTest.spec.js` 文件。
```js
import { mount } from '@vue/test-utils'
import Test from '../src/views/Test'

describe('Component', () => {
  test('Test.vue', async () => {
    const wrapper = mount(Test)
    expect(wrapper.html()).toContain('Unit Test Page')
    expect(wrapper.html()).toContain('count is: 0')
    await wrapper.find('button').trigger('click')
    expect(wrapper.html()).toContain('count is: 1')
  })
})
```

7、添加运行命令
```json
{
  "scripts": {
    "test": "jest"
  },
}
```

8、在 push 代码前执行单元测试。
运行如下命令，创建 `pre-push` hook 文件
```sh
npx husky add .husky/pre-push "npm run test $1"
```

生成 `pre-push` 文件内容如下：
```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run test
```
