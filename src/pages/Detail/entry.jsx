/**
 * Created by liudonghui on 2018/4/13.
 */
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import 'common/less/base.less';
import Detail from './index';

hydrateRoot(document.getElementById('root'), <Detail ssrData={window.INITIAL_STATE && window.INITIAL_STATE.ssrData} />);

if (module.hot) {
	module.hot.accept();
}
