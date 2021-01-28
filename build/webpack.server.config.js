const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function server(dir) {
  return resolve(path.join('server', dir))
}

module.exports = {
  entry: {
    index: server('app.prod.js')
  },
  mode: 'production',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  output: {
    path: resolve('dist/server'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MOCK: !!process.env.MOCK,
        CODE_ENV: JSON.stringify(process.env.CODE_ENV),
        RUN_ENV: JSON.stringify(process.env.RUN_ENV)
      }
    })
  ],
  resolve: {
    // alias: {
    //     'native-api': server('mock-modules')
    // },
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          "babelrc": false,
          "presets": [[
            "@babel/preset-env", {
              "targets": {
                "node": "current"
              },
              "modules": 'commonjs',
              "useBuiltIns": false,
              "debug": false
            }
          ], "@babel/preset-react"],
          "plugins": [[
            "@babel/plugin-transform-runtime", {
              "corejs": 3
            }
          ]]
        }
      },
      {
        test: /\.(less|css)$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: '/static/images/[name].[hash:8].[ext]'
        }
      },
    ]
  },
  // externals: [nodeExternals({
  //     whitelist: ['native-api']
  // })],
  externals: [nodeExternals()]
};
