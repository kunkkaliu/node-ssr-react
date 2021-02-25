/**
 * Created by liudonghui on 2018/3/6.
 */
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const InlineManifestWebpackPlugin = require('@insanecoding/inline-manifest-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function src(dir) {
  return resolve(path.join('src', dir))
}

function getEntry(globPath, pathDir) {
  const files = glob.sync(globPath);
  let entries = {},
    entry, dirname, basename, pathname, extname, key;
  for (let i = 0; i < files.length; i++) {
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
const entries = getEntry('./src/pages/*/entry.jsx', 'src/pages/');
const HtmlPlugin = [];
const pageTitles = {
  list: '资讯列表',
  login: '登陆页',
  detail: '资讯详情',
  flv: 'flv测试',
};

for (let key in entries) {
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
  plugins: [].concat(new ESLintPlugin(), HtmlPlugin, new InlineManifestWebpackPlugin('runtime')),
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
        loader: 'babel-loader',
        exclude: [/node_modules/, src('common/libs')]
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
        test: /\.less?$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            // minimize: true,
            importLoaders: 2,
            modules: false,
            // localIdentName: '[local]___[hash:base64:5]'
          }
        }, 'postcss-loader', 'less-loader']
      }
    ]
  }
};
