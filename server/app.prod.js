/**
 * Created by liudonghui on 2018/3/5.
 */

const path = require('path');
const Koa = require('koa');
const koaCompress = require('koa-compress');
const koaStatic = require('koa-static-cache');
const router = require('./routes/index');
const koaParams = require('./middlewares/koa-params');
const Logger = require('./middlewares/logger');
const koaLogger = require('./middlewares/koa-logger');
const koaRender = require('./middlewares/koa-render');
const routeNotFound = require('./middlewares/route-notfound');

global.logger = Logger({
    formatter(level, group, message) {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} [${level}] ${group}: ${message}`;
    },
});

const app = new Koa();
app.context.logger = logger;
const basePath = path.join(__dirname, '../dist/client/views');
koaRender(app, {
    basePath,
});
app.use(koaCompress({
    filter: function (content_type) {
        return /text|javascript/i.test(content_type);
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH,
}));
app.use(koaStatic(path.join(__dirname, '../dist/client')), {
    maxAge: 365 * 24 * 60 * 60,
});
app.use(koaParams());
app.use(koaLogger());
app.use(router.routes()).use(router.allowedMethods());
app.use(routeNotFound({
    redirect: '/',
}));

app.listen(3003, (_) => {
    logger.success('server', 'App (pro) is going to be running on port 3003.');
});
