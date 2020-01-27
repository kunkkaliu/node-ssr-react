/**
 * Created by liudonghui on 2018/3/6.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { netApi as api } from '../network';
import Detail from '../../src/pages/Detail';

const replaceDetail = (details) => {
    let texts = '';
    while (details.indexOf('<img') != -1) {
        texts += details.substring('0', details.indexOf('<img') + 4);
        details = details.substring(details.indexOf('<img') + 4);
        if (details.indexOf('src=') != -1 && details.indexOf('src=') < details.indexOf('>')) {
            texts += details.substring(0, details.indexOf('src="') + 5) + 'https://api.zudapang.ltd/hotnews/image?imgUrl=';
            details = details.substring(details.indexOf('src="') + 5);
        }
    }
    texts += details;
    return texts;
};

const detailRouter = (router, koaCache) => {
    router.get('/detail', koaCache(10 * 60), async (ctx, next) => {
        let startTime = new Date().getTime();
        const { articleId = '' } = ctx.query;
        const res = await api.get('/hotnews/detail', {
            params: {
                articleId,
            },
        }).catch((err) => {});
        
        let useTime = new Date().getTime() - startTime;
        if (useTime > 500) {
            ctx.logger.warn('api', `access /hotnews/detail use ${useTime}ms`);
        }
        ctx.logger.info('api', `access /hotnews/detail use ${useTime}ms`);
        let title = '', content = '';
        const resData = res.data || {};
        if (resData.code === 0 && resData.data) {
            // eslint-disable-next-line prefer-destructuring
            title = resData.data.title;
            content = replaceDetail(resData.data.content);
        }
        const renderContent = renderToString(<Detail title={title} content={content} />);
        await ctx.render('detail', renderContent, {
            title,
            content,
        });
    });
};

export default detailRouter;
