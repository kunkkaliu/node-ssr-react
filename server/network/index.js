/**
 * Created by liudonghui on 2017/11/4.
 */

import { config as apiConfig, useInterceptors } from './api';
import { generateNet } from './net-generate';

export const netApi = generateNet(apiConfig, useInterceptors);

