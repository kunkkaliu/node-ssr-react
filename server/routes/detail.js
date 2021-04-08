/**
 * Created by liudonghui on 2018/3/6.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import Detail from '../../src/pages/Detail';

const detailRouter = (router, koaCache) => {
	router.get('/detail', koaCache(10 * 60), async (ctx) => {
		const startTime = new Date().getTime();
		const { articleId = '' } = ctx.query;
		const data = await Detail.getInitialProps({
			articleId,
		});
		const useTime = new Date().getTime() - startTime;
		if (useTime > 500) {
			ctx.logger.warn('[api]', `access /hotnews/detail use ${useTime}ms`);
		} else {
			ctx.logger.info('[api]', `access /hotnews/detail use ${useTime}ms`);
		}
		const renderContent = renderToString(<Detail ssrData={{ article: data.article }} />);
		await ctx.render('detail', renderContent, {
			ssrData: {
				article: data.article,
			},
		});
	});
};

export default detailRouter;
