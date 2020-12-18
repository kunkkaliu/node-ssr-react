/**
 * Created by liudonghui on 2018/6/11.
 */
const koaUA = (options) => async (ctx, next) => {
  const userAgent = ctx.header['user-agent'] || '';
  ctx.isGuaziApp = /guazi|ganji/i.test(userAgent);
  await next();
};

module.exports = koaUA;
