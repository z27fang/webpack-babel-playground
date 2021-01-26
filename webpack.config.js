const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js', // 入口
    output: {  // 定义打包后的位置
        path: path.resolve(__dirname, 'dist'),   
        filename: '[id].bundle.js'
    },
    mode: 'development', //选择使用build的模式，在development下会自动添加很多注释，并且不会修改命名
    devtool: 'source-map', //选择一个友善的devtool
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/, //不转义node_modules下的js
                use: {
                    loader: 'babel-loader' 
                    // 在这里使用babel-loader, 根据官网，对应各种js有各种匹配的loader，
                    //  包括react-lodaer等等
                }
            }
        ]
    },
    // 定义本地 dev-server的属性
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
        hot: true, 
        inline: true,
        host: "localhost" 
    },
    plugins: [
        // 这个插件负责打包html
        new HtmlWebpackPlugin({
            title: 'main', 
            filename: 'index.html', 
            template: 'index.html' 
        }),
        //  这个插件负责打包css
        new MiniCssExtractPlugin(),
        //  这个插件支持hot-reloading
        new webpack.HotModuleReplacementPlugin()
    ]
}