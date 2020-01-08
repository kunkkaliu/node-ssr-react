/**
 * Created by liudonghui on 2017/11/4.
 */

import axios from 'axios';

/**
 * 生成netApi对象
 * @param config api配置
 * @param useInterceptors 全局拦截器
 * @return {AxiosInstance}
 */
export function generateNet(netConfig, useInterceptors) {
    if (process.env.MOCK) {
        const getMockInstance = require('./mock-generate').default;
        const mock = getMockInstance();
        netConfig.adapter = request => new Promise(resolve =>
            mock(request, (response) => {
                setTimeout(() => {
                    if (typeof response.data === 'function') {
                        let { config: { method, params, data } } = response;
                        if (method === 'post') {
                            params = JSON.parse(data);
                        }
                        if (!params) {
                            params = {};
                        }
                        resolve({
                            ...response,
                            data: response.data(params),
                        });
                    } else {
                        resolve(response);
                    }

                }, 500);
            }));
        netConfig.baseURL = '';
    }
    const netApi = axios.create(netConfig);
    useInterceptors(netApi);
    return netApi;
}
