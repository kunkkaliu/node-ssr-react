/**
 * Created by liudonghui on 2018/4/13.
 */
// import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import 'common/less/base.less';
import Flv from './index';

hydrate(<Flv />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
