const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/main.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    }
}