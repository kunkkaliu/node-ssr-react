/**
 * Created by liudonghui on 2018/3/6.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import Start from '../../src/pages/Start';

const startRouter = (router, koaCache) => {
    router.get('/', koaCache(10 * 60), async (ctx, next) => {
        const name = 'kunkkaliu';
        const renderContent = renderToString(<Start name={name}></Start>);
        await ctx.render('start', renderContent, {
            name: 'kunkkaliu'
        });
    });
};

export default startRouter;