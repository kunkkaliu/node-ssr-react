/**
 * Created by liudonghui on 2018/3/7.
 */
// import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import 'common/less/base.less';
import List from './index';

hydrate(<List records={window.INITIAL_STATE && window.INITIAL_STATE.records}></List>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
