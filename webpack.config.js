
var webpack = require("webpack");
var path = require("path");

module.exports = {

    entry: {
        main: './pages/index.js',
    },
    output:{
        path: path.join(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: './build',
        port: 8082
        
    },
    module:{
        
        loaders:[
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                     presets: ['react']
                 }

            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',          
            },
          
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }
            
        ]
    }
};