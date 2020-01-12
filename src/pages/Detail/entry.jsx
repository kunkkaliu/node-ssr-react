/**
 * Created by liudonghui on 2018/4/13.
 */
// import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import 'common/less/base.less';
import Detail from './index';

hydrate(<Detail title={window.INITIAL_STATE.title} content={window.INITIAL_STATE.content} />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
