/**
 * Created by liudonghui on 2018/4/19.
 */

const koaLogger = () => async (ctx, next) => {
	const startTime = new Date().getTime();
	await next();
	const useTime = new Date().getTime() - startTime;
	const reg = /token=[^&]*&?/;
	const oldUrl = ctx.originalUrl || ctx.url;
	let url = oldUrl;
	const token = (ctx.param && ctx.param.token) || '';
	if (oldUrl.match(reg)) {
		url = oldUrl.replace(`token=${token}`, 'token=xxx');
	}
	if (useTime > 500) {
		ctx.logger.warn('[access]', `access url ${url} use ${useTime}ms`);
	} else {
		ctx.logger.info('[access]', `access url ${url} use ${useTime}ms`);
	}
};

module.exports = koaLogger;
