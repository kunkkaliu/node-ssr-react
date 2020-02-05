/**
 * Created by liudonghui on 2018/3/6.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import List from '../../src/pages/List';

const listRouter = (router, koaCache) => {
    router.get('/', async (ctx, next) => {
        let pageNum = 1;
        let startTime = new Date().getTime();
        const data = await List.getInitialProps();
        let useTime = new Date().getTime() - startTime;
        if (useTime > 500) {
            ctx.logger.warn('api', `access /hotnews/list use ${useTime}ms`);
        } else {
            ctx.logger.info('api', `access /hotnews/list use ${useTime}ms`);
        }
        const hasMore = data.records.length > 0;
        if (hasMore) pageNum += 1;
        const renderContent = renderToString(<List records={data.records} pageNum={pageNum} />);
        await ctx.render('list', renderContent, {
            ssrData: {
                records: data.records,
                pageNum,
            },
        });
    });
};

export default listRouter;
