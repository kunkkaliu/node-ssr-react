/**
 * Created by liudonghui on 2018/3/6.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { netApi as api } from '../network';
import List from '../../src/pages/List';

const listRouter = (router, koaCache) => {
    router.get('/', koaCache(10 * 60), async (ctx, next) => {
        let startTime = new Date().getTime();
        const res = await api.get('/hotnews/list', {
            params: {
                pageNum: 1,
            }
        }).catch(err => {});
        
        let useTime = new Date().getTime() - startTime;
        if (useTime > 500) {
            logger.warn('api', `access /hotnews/list use ${useTime}ms`);
        }
        logger.info('api', `access /hotnews/list use ${useTime}ms`);

        let records = [];
        if (res && res.data && res.data.code === 0) records = res.data.data;
        const renderContent = renderToString(<List records={records} />);
        
        await ctx.render('list', renderContent, {
            records,
        });
    });
};

export default listRouter;