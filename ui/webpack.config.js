// Load the environment from the env file
require("./configs/env")();

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

class GenerateConfigPlugin {

    constructor(options) {
		this.options = Object.assign({
            path: 'config.json',
            envMatch: /^REACT_APP_/i
        }, options);
	}

    apply(compiler) {
        compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {

            // Filter out the env variable we are interested in using a regex
            const variables = Object.keys(process.env).filter(key => this.options.envMatch.test(key));

            const output = variables.reduce((env, key) => {
                env[key] = process.env[key];
                return env;
            }, {});

            // Insert this list into the webpack build as a new file asset:
            compilation.assets[this.options.path] = {
              source: function() {
                return JSON.stringify(output);
              },
              size: function() {
                return JSON.stringify(output).length;
              }
            };

            callback();
        });
    }
}

module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].[contenthash].js'
    },
    devServer: {
        contentBase: './build',
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                },
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // Ensure that react is running in the correct mode
        new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') ,'process.env.VERSION': JSON.stringify(process.env.REACT_APP_VERSION) }),
        new GenerateConfigPlugin({
            path: 'config.json',
            envMatch: /^REACT_APP_/i
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('./index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};
