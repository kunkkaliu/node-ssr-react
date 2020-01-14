/**
 * Created by liudonghui on 2018/4/18.
 */

require('babel-polyfill');
require('babel-register')({
    ignore: /\/(node_modules)\//,
    presets: ['env', 'react', 'stage-0'],
    plugins: [],
});
require('./ignore')();
require('asset-require-hook')({
    extensions: ['jpg', 'jpeg', 'png', 'gif'],
    limit: 10240,
    name: '/static/images/[name].[hash:8].[ext]',
});
const path = require('path');
const Koa = require('koa');
const webpack = require('webpack');
const koaCompress = require('koa-compress');
const router = require('./routes/index');
const Logger = require('./middlewares/logger');
const koaLogger = require('./middlewares/koa-logger');
const koaParams = require('./middlewares/koa-params');
const koaRender = require('./middlewares/koa-render');
const routeNotFound = require('./middlewares/route-notfound');

global.logger = Logger({
    formatter(level, group, message) {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} [${level}] ${group} ${message}`;
    },
});

const app = new Koa();
const config = require('../build/webpack.dev.config');

const compiler = webpack(config);
let devMiddleWare;
devMiddleWare = require('koa-webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
    },
});

const filePath = path.join(config.output.path, 'view');
app.use(koaCompress({
    filter: function (content_type) {
        return /text|javascript/i.test(content_type);
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH,
}));
app.use(devMiddleWare);
app.use(require('koa-webpack-hot-middleware')(compiler));

app.use(koaParams());
app.use(koaLogger());
app.use(koaRender(filePath, true, devMiddleWare));
app.use(router.routes()).use(router.allowedMethods());
app.use(routeNotFound({
    redirect: '/',
}));

app.listen(3003, function () {
    logger.success('server', 'App (dev) is going to be running on port 3003.');
});
