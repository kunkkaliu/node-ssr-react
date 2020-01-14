/**
 * Created by liudonghui on 2018/4/13.
 */
const routeNotFount = options => async (ctx, next) => {
    if (ctx.status === 404) {
        ctx.redirect(options.redirect || '/');
        ctx.status = 302;
    } else {
        await next();
    }
};

module.exports = routeNotFount;
