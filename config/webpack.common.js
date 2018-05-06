const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')

const ExtractCSSPlugin = new ExtractTextPlugin({
    filename: './assets/css/[name].css',
});

const config = {
    context: path.resolve(__dirname, "../src"),
    entry: {
        app: './assets/js/app.js',
        page: './assets/js/page.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'assets/js/[name].bundle.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, '../src', 'assets', 'scss')],
                use: ExtractCSSPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {

                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/media/',
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        ExtractCSSPlugin,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            filename: 'page.html',
            template: 'page.html',
            chunks: ['page']
        }),
    ]
};

module.exports = config;