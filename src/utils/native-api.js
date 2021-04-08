/* eslint-disable import/no-mutable-exports */
let nativeApi = {};

if (process.env.RUN_ENV === 'client') {
	// nativeApi = require('native-api');
	nativeApi = {};
}

export default nativeApi;
