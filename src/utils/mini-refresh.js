/* eslint-disable global-require */
/* eslint-disable import/no-mutable-exports */
let minirefresh = {};

if (process.env.RUN_ENV === 'client') {
	minirefresh = require('minirefresh');
}

export default minirefresh;
