/**
 * Created by liudonghui on 2018/3/6.
 */
const Router = require('koa-router');
const koaCache = require('../middlewares/koa-cache');
// const fs = require('fs');
const router = new Router();

// const isDeveloping = process.env.NODE_ENV === 'development';
// const assets = !isDeveloping ? JSON.parse(fs.readFileSync('./dist/assets.json')) : null;

const listRouter = require('./list').default;
const detailRouter = require('./detail').default;
const loginRouter = require('./login').default;
const flvRouter = require('./flv').default;

listRouter(router, koaCache);
detailRouter(router, koaCache);
loginRouter(router, koaCache);
flvRouter(router, koaCache);

module.exports = router;
