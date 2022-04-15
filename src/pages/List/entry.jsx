/**
 * Created by liudonghui on 2018/3/7.
 */
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import 'common/less/base.less';
import List from './index';

hydrateRoot(document.getElementById('root'), <List ssrData={window.INITIAL_STATE && window.INITIAL_STATE.ssrData} />);

if (module.hot) {
	module.hot.accept();
}
