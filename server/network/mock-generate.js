/**
 * Created by liudonghui on 2017/11/4.
 */

let mockInstance = null;
console.error = console.error || console.log;
console.warn = console.warn || console.log;

/**
 * 通过context 生成 mock route 列表
 * @param context
 * @returns {Array}
 */
function generateRoutes(context) {
    const routes = {};
    context.keys().forEach((path) => {
        const p = path.replace(/\.(.*)\.js/, '$1');
        routes[p] = {
            path: p,
            data: context(path),
        };
    });
    return Object.keys(routes).map(k => routes[k]);
}

let mockRoutes = null;
if (process.env.RUN_ENV === 'server') {
    const requireContext = require('./requireContext');
    mockRoutes = generateRoutes(requireContext('./mock/', true, /\.js$/));
} else {
    mockRoutes = generateRoutes(require.context('./mock/', true, /\.js$/));
}

function MockInstance(routers) {
    console.log('[MOCK INFO] mock instance init...', routers);
    return (request, callback) => {
        const { url } = request;
        let found = false;
        for (let i = 0; i < routers.length; i += 1) {
            const route = routers[i];
            const match = route.path === url;
            if (match) {
                if (callback) {
                    callback({
                        config: request,
                        data: route.data,
                    });
                }
                found = true;
                break;
            }
        }
        if (!found) {
            console.warn('[MOCK WARNING] request: not found', request);
        }
    };
}

/**
 * 获取Mock实例，单例
 * @return {*}
 */
export default function getMockInstance() {
    if (!mockInstance) {
        mockInstance = MockInstance(mockRoutes);
    }
    return mockInstance;
}
