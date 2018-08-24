/**
 * Created by liudonghui on 2018/4/19.
 */
const getLogger = require('./logger');

const koaLogger = (options) => {
    const logger = getLogger({
        formatter(level, group, message) {
            const date = new Date();
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} [${level}] ${group}: ${message}`
        }
    });
    return async (ctx, next) => {
        ctx.logger = logger;
        let startTime = new Date().getTime();
        await next();
        let useTime = new Date().getTime() - startTime;
        const reg = /token=[^&]*&?/;
        let oldUrl = ctx.originalUrl || ctx.url;
        let url = oldUrl;
        const token = (ctx.param && ctx.param['token']) || '';
        if (oldUrl.match(reg)) {
            url = oldUrl.replace(`token=${token}`, 'token=xxx');
        }
        if (useTime > 500) {
            logger.warn('access', `access url ${url} use ${useTime}ms`);
        }
        logger.info('access', `access url ${url} use ${useTime}ms`);
    }
};

module.exports = koaLogger;
