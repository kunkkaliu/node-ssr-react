/**
 * Created by liudonghui on 2018/3/7.
 */
const webpack = require('webpack');
const base = require('./webpack.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

base.mode = 'development';
base.output.publicPath = 'http://127.0.0.1:9999/';
// base.devtool = 'cheap-module-eval-source-map';
Object.keys(base.entry).forEach(function (name) {
  base.entry[name] = ['webpack-hot-client/client?reload=true'].concat(base.entry[name]);
});
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
      RUN_ENV: JSON.stringify('client')
    }
  }),
  // new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    filename: 'static/css/[name].css'
  })
);

module.exports = base;
