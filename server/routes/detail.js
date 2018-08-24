/**
 * Created by liudonghui on 2018/3/6.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import Detail from '../../src/pages/Detail';

const detailRouter = (router, koaCache) => {
    router.get('/detail', koaCache(10 * 60), async (ctx, next) => {
        const renderContent = renderToString(<Detail></Detail>);
        await ctx.render('detail', renderContent, {
        });
    });
};

export default detailRouter;