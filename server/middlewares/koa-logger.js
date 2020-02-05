/**
 * Created by liudonghui on 2018/4/19.
 */

const koaLogger = options => async (ctx, next) => {
    let startTime = new Date().getTime();
    await next();
    let useTime = new Date().getTime() - startTime;
    const reg = /token=[^&]*&?/;
    let oldUrl = ctx.originalUrl || ctx.url;
    let url = oldUrl;
    const token = (ctx.param && ctx.param.token) || '';
    if (oldUrl.match(reg)) {
        url = oldUrl.replace(`token=${token}`, 'token=xxx');
    }
    if (useTime > 500) {
        ctx.logger.warn('access', `access url ${url} use ${useTime}ms`);
    }
    ctx.logger.info('access', `access url ${url} use ${useTime}ms`);
};

module.exports = koaLogger;
