/**
 * Created by liudonghui on 2018/4/24.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import Login from '../../src/pages/Login';

const startRouter = (router, koaCache) => {
    router.get('/login', koaCache(10 * 60), async (ctx, next) => {
        const renderContent = renderToString(<Login/>);
        await ctx.render('login', renderContent);
    });
};

export default startRouter;