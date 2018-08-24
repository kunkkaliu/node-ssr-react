/**
 * Created by liudonghui on 2018/3/7.
 */
// import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import 'common/less/base.less';
import Start from './index';

hydrate(<Start name={window.INITIAL_STATE && window.INITIAL_STATE.name}></Start>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
