/**
 * Created by liudonghui on 2018/4/13.
 */
import React from 'react';
import { hydrate } from 'react-dom';
import 'common/less/base.less';
import Detail from './index';

hydrate(<Detail ssrData={window.INITIAL_STATE && window.INITIAL_STATE.ssrData} />, document.getElementById('root'));

if (module.hot) {
	module.hot.accept();
}
