/**
 * Created by liudonghui on 2018/4/24.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import Flv from '../../src/pages/Flv';

const loginRouter = (router, koaCache) => {
  router.get('/flv', koaCache(10 * 60), async (ctx, next) => {
    const renderContent = renderToString(<Flv />);
    await ctx.render('flv', renderContent);
  });
};

export default loginRouter;
