const MinifyPlugin = require('babel-minify-webpack-plugin');
var config = require('./webpack.config');

var prodConfig = {
    devtool: false,
}

Object.assign(config, prodConfig);
config.plugins.push(new MinifyPlugin());

module.exports = config;

