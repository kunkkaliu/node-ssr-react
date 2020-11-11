/**
 * Created by liudonghui on 2018/3/7.
 */
import React from 'react';
import { hydrate } from 'react-dom';
import 'common/less/base.less';
import List from './index';

hydrate(<List ssrData={window.INITIAL_STATE && window.INITIAL_STATE.ssrData} />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
