var path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
var SRC_DIR = path.join(__dirname, '/client/src')
var DIST_DIR = path.join(__dirname, '/client/dist')

module.exports = {
    // target: 'web',
    entry: `${SRC_DIR}/index.jsx`,
    module: {
        rules: [
            {
                test: /\.js?x$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'developement',
                            reloadAll: true
                        }
                    },
                    'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            }
        ]
    },
    devServer: {
        // contentBase: `${DIST_DIR}/assets`,
        hot: true,
        publicPath: '/',
        // watchContentBase: true,
        historyApiFallback: true,
        proxy: {
            '/api/episodes': {
                target: 'http://localhost:3000',
                secure: false
            },
            '/api/shoutouts': {
                target: 'http://localhost:3000',
                secure: false
            },
            '/**/assets/**': {
                target: 'http://localhost:3000',
                secure: false
            }
        },
        overlay: {
            // Shows a full-screen overlay in the browser when there are compiler errors or warnings
            warnings: false, // defaults to false
            errors: false // defaults to false
        }
        // historyApiFallback: true
    },
    output: {
        path: DIST_DIR,
        filename: '[name].[hash].js'
        // publicPath: DIST_DIR
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: `${SRC_DIR}/index.html`,
            filename: 'index.html'
        }),
        new WebpackMd5Hash()
    ]
}

// loaders: [
//   {
//     test: /\.jsx?/,
//     include: SRC_DIR,
//     loader: 'babel-loader',
//     query: {
//       presets: ['react', 'es2015']
//     }
//   }
// ]
