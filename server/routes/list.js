/**
 * Created by liudonghui on 2018/3/6.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import List from '../../src/pages/List';

const listRouter = (router) => {
	router.get('/', async (ctx) => {
		let pageNum = 1;
		const startTime = new Date().getTime();
		const data = await List.getInitialProps();
		const useTime = new Date().getTime() - startTime;
		if (useTime > 500) {
			ctx.logger.warn('[api]', `access /hotnews/list use ${useTime}ms`);
		} else {
			ctx.logger.info('[api]', `access /hotnews/list use ${useTime}ms`);
		}
		const hasMore = data.records.length > 0;
		if (hasMore) pageNum += 1;
		const renderContent = renderToString(<List ssrData={{
			records: data.records,
			pageNum: data.pageNum,
		}} />);
		await ctx.render('list', renderContent, {
			ssrData: {
				records: data.records,
				pageNum,
			},
		});
	});
};

export default listRouter;
