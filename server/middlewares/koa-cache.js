/**
 * Created by liudonghui on 2018/4/18.
 */
const LRU = require('lru-cache');

const MAXCACHESIZE = 20;
const mcache = new LRU({
    max: MAXCACHESIZE * 1024 * 1024
});

const koaCache = (duration) => {
    return async (ctx, next) => {
        const now = new Date().getTime();
        let url = ctx.originalUrl || ctx.url || '';
        const key = '__koa_ssr__' + url.split('?')[0];
        const cachedBody = mcache.get(key);
        if (cachedBody) {
            ctx.type = 'text/html';
            ctx.body = cachedBody;
            ctx.logger.info('cache', `use lru-cache for url ${key}, use ${new Date().getTime() - now}ms`);
            return;
        }
        await next();
        mcache.set(key, ctx.body, duration * 1000);
        ctx.logger.info('cache', `lru-cache for url ${key}, use expire ${duration}s`);
    }
};

module.exports = koaCache;
