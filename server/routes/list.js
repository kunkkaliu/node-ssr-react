/**
 * Created by liudonghui on 2018/3/6.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { netApi as api } from '../network';
import List from '../../src/pages/List';

const listRouter = (router, koaCache) => {
    router.get('/', async (ctx, next) => {
        let pageNum = 1;
        let startTime = new Date().getTime();
        const res = await api.get('/hotnews/list', {
            params: {
                pageNum,
            },
        }).catch((err) => {});
        
        let useTime = new Date().getTime() - startTime;
        if (useTime > 500) {
            logger.warn('api', `access /hotnews/list use ${useTime}ms`);
        }
        logger.info('api', `access /hotnews/list use ${useTime}ms`);

        let records = [];
        if (res && res.data && res.data.code === 0) records = res.data.data;
        const hasMore = records.length > 0;
        if (hasMore) pageNum += 1;

        const renderContent = renderToString(<List records={records} pageNum={pageNum} />);
        await ctx.render('list', renderContent, {
            records,
            pageNum,
        });
    });
};

export default listRouter;
