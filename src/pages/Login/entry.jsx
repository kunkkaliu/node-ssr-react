/**
 * Created by liudonghui on 2018/4/13.
 */
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import 'common/less/base.less';
import Login from './index';

hydrateRoot(document.getElementById('root'), <Login></Login>);

if (module.hot) {
	module.hot.accept();
}
