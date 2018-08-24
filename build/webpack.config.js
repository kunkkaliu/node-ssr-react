/**
 * Created by liudonghui on 2018/3/6.
 */
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function src(dir) {
    return resolve(path.join('src', dir))
}

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname, key;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        key = pathname.split('/')[0].toLowerCase();
        entries[key] = entry;
    }
    return entries;
}
//我们的key不是简单用的上一个代码的index,login而是用的index/index,login/login因为考虑在login目录下面还有register
//文件路径的\\和/跟操作系统也有关系，需要注意
var entries = getEntry('./src/pages/*/entry.jsx', 'src/pages/');
var HtmlPlugin = [];
var pageTitles = {
    start: '首页',
    login: '登陆页',
    detail: '详情页'
};

for (var key in entries) {
    // entries[key] = './src/pages/' + key + '/entry.jsx';
    HtmlPlugin.push(new HtmlWebpackPlugin({
        title: pageTitles[key],
        filename: 'views/' + key + '.html',
        template: src('common/templates/template.html'),
        inject: true,
        favicon: src('favicon.ico'),
        chunks: ['runtime', 'vendor', key],
        minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeComments: true
        }
    }))
}

module.exports = {
    entry: entries,
    devtool: 'inline-source-map',
    target: 'web',
    output: {
        path: resolve('/dist/client'),
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].js',
        publicPath: '/'
    },
    plugins: [].concat(HtmlPlugin, new InlineManifestWebpackPlugin('runtime')),
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            'common': src('common'),
            'components': src('components'),
            'utils': src('utils'),
            'pages': src('pages')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: /node_modules/,
                include: resolve('')
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: resolve('')
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'static/images/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'static/fonts/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.css?$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, 'postcss-loader']
            },
            {
                test: /\.less?$/,
                exclude: /node_modules/,
                use: ['style-loader', MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        modules: false,
                        localIdentName: '[local]___[hash:base64:5]'
                    }
                }, 'postcss-loader', 'less-loader']
            },
            {
                test: /\.less?$/,
                exclude: /src/,
                use: ['style-loader', MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                    }
                }, 'postcss-loader', 'less-loader']
            }
        ]
    }
};
