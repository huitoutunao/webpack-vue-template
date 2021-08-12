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
        path: path.resolve(__dirname, 'dist')
    }
}
