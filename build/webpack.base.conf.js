var webpack = require('webpack');
var path = require('path');
var vueLoaderConfig = require('./vue-loader.conf');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    // entry: {
    //     'entry.1': '../entry.1.js',
    //     'entry.2': '../entry.2.js'
    // },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            }
        ]
    }
}