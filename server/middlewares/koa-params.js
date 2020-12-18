/**
 * Created by liudonghui on 2018/4/25.
 */
const urlParams = require('../../src/utils/params-util').default;

const koaParams = (options) => async (ctx, next) => {
  const url = ctx.originalUrl || ctx.url;
  ctx.param = urlParams(url);
  await next();
};

module.exports = koaParams;
