const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'src/app');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js')
};

module.exports = {
    entry: path.join(paths.JS, 'index.js'),
    output: {
        path: paths.DIST,
        filename: 'app.bundle.js'
    },
    devtool: "source-map",
    devServer:{
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(paths.SRC, 'index.html'),
        }),
        new ExtractTextPlugin('style.bundle.css'),
    ],
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    }, {loader: 'postcss-loader'}
                ]
            })},
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        sourceMap: true,
                        importLoaders: 2,
                        localIdentName: '[local]_[hash:base64:5]'
                    }}, 'sass-loader'
                ]})
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['file-loader'],
            }
        ]
    },
    resolve:{
        extensions: ['.js', '.jsx'],
        alias: {
            Helpers: path.resolve(__dirname, 'src/js/helpers'),
            Scenes: path.resolve(__dirname, 'src/js/scenes/'),
            Components: path.resolve(__dirname, 'src/js/components/'),
            ReduxActions: path.resolve(__dirname, 'src/js/redux/actions/'),
            ReduxConstants: path.resolve(__dirname, 'src/js/redux/constants/'),
            ReduxReducers: path.resolve(__dirname, 'src/js/redux/reducers/'),
            Services: path.resolve(__dirname, 'src/js/services/'),
        }
    }
}