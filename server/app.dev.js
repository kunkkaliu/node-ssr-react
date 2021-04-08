/**
   * Created by liudonghui on 2018/4/18.
   */
require('@babel/register')({
	ignore: [/\/(node_modules)\//],
	presets: [[
		'@babel/preset-env', {
			targets: {
				node: 'current',
			},
			modules: 'commonjs',
			useBuiltIns: false,
			debug: false,
		},
	], '@babel/preset-react'],
	plugins: [[
		'@babel/plugin-transform-runtime', {
			corejs: 3,
		},
	]],
});
require('./ignore')();
require('asset-require-hook')({
	extensions: ['jpg', 'jpeg', 'png', 'gif'],
	limit: 10240,
	name: '/static/images/[name].[hash:8].[ext]',
});
const path = require('path');
const cluster = require('cluster');
const chokidar = require('chokidar');
const Koa = require('koa');
const webpack = require('webpack');
const koaWebpack = require('koa-webpack');
const router = require('./routes/index');
const Logger = require('./middlewares/logger');
const koaLogger = require('./middlewares/koa-logger');
const koaParams = require('./middlewares/koa-params');
const koaRender = require('./middlewares/koa-render');
const routeNotFound = require('./middlewares/route-notfound');
const config = require('../build/webpack.dev.config');
const Events = require('./events');

const logger = Logger({
	formatter(level, group, message) {
		const date = new Date();
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} [${level}] ${group} ${message}`;
	},
});

(async function () {
	if (cluster.isMaster) {
		const app = new Koa();
		const compiler = webpack(config);
		const koaWebpackMiddleware = await koaWebpack({
			compiler,
			devMiddleware: {
				publicPath: config.output.publicPath,
				stats: {
					colors: true,
					modules: false,
					children: false,
					chunks: false,
					chunkModules: false,
				},
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			},
		});
		app.use(koaWebpackMiddleware);
		const { devMiddleware } = koaWebpackMiddleware;
		let worker = cluster.fork();
		chokidar.watch(['server'], {}).on('change', () => {
			if (worker) {
				worker.kill();
			}
		});
		cluster.on(Events.EVENT_EXIT, (_worker) => {
			logger.error('[exit]', `worker(${_worker.id}) is exited, a new worker will be created.`);
			worker = cluster.fork();
		});
		cluster.on(Events.EVENT_MSG, (_worker, data) => {
			if (data.action === Events.EVENT_FILE_READ) {
				const mfs = devMiddleware.fileSystem;
				devMiddleware.waitUntilValid(() => {
					const htmlStream = mfs.readFileSync(data.filename);
					_worker.send({
						action: Events.EVENT_FILE_READ_DONE,
						content: htmlStream.toString(),
					});
				});
			}
		});
		app.listen(9999, '127.0.0.1', () => {
			logger.success('[master]', 'Webpack server is going to be running on port 9999.');
		});
	} else if (cluster.isWorker) {
		const app = new Koa();
		app.context.logger = logger;
		const basePath = path.join(config.output.path, 'views');
		koaRender(app, {
			basePath,
		});
		app.use(koaParams());
		app.use(koaLogger());
		app.use(router.routes()).use(router.allowedMethods());
		app.use(routeNotFound({
			redirect: '/',
		}));
		app.listen(3003, '127.0.0.1', () => {
			logger.success('[worker]', 'App server (dev) is going to be running on port 3003.');
		});
	}
}());
