/**
 * Created by liudonghui on 2018/3/7.
 */
const webpack = require('webpack');
const base = require('./webpack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

base.mode = 'production';
base.devtool = 'source-map';
Object.keys(base.entry).forEach(function (name) {
  base.entry[name] = [].concat(base.entry[name]);
});
base.output.filename = 'static/js/[name].[chunkhash].js';
base.output.chunkFilename = 'static/js/[name].[chunkhash].js';

base.optimization = {
  runtimeChunk: {
    name: "runtime"
  },
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendor",
        chunks: "all"
      }
    }
  }
};

base.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      MOCK: !!process.env.MOCK,
      CODE_ENV: JSON.stringify(process.env.CODE_ENV),
      RUN_ENV: JSON.stringify(process.env.RUN_ENV)
    }
  }),
  new MiniCssExtractPlugin({
    filename: "static/css/[name].[contenthash].css"
  }),
  new UglifyJsPlugin({
    sourceMap: true,
    uglifyOptions: {
      compress: {
        drop_debugger: true,
        drop_console: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true
      }
    }
  }),
  new webpack.HashedModuleIdsPlugin()
);

if (!!process.env.ANALYZE) {
  base.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = base;