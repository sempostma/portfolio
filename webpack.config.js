const path = require('path');

const production = process.env.NODE_ENV === 'production'

module.exports = {
    mode: production ? 'production' : 'development',
    entry: {
        vendor: path.resolve(__dirname, './client/scripts/vendor.ts'),
        main: path.resolve(__dirname, './client/scripts/main.ts')
    },
    cache: production,
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        alias: {
            angular: path.resolve(__dirname, './node_modules/angular/angular.min.js'),
            sanitize: path.resolve(__dirname, './node_modules/angular-sanitize/angular-sanitize.min.js'),
            normalizecss: path.resolve(__dirname, './node_modules/normalize.css/normalize.css')
        }
    },
    plugins: [],
    module: {
        rules: [
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // babel-loader: converts javascript (es6) to javascript (es5)
            {
                'test': /\.tsx?$/,
                'use': [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env'],
                        plugins: ['syntax-dynamic-import']
                    },
                }, 'ts-loader'],
            },
            // babel-loader for pure javascript (es6) => javascript (es5)
            {
                'test': /\.(jsx?)$/,
                'use': [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env'],
                    },
                }]
            }
        ]
    },
    output: {
        publicPath: '/bundle/',
        path: path.resolve(__dirname, './client/bundle'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'client')
        },
        compress: true,
        port: 3000
    }
}