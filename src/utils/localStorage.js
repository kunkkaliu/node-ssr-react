let support = true;
try {
	window.localStorage.setItem('localStorageTest', '1');
	window.localStorage.removeItem('localStorageTest');
} catch (err) {
	support = false;
}

const localStrorageFix = {
	getItem(key) {
		if (support) return window.localStorage.getItem(key);
		return '';
	},
	setItem(key, value) {
		if (support) window.localStorage.setItem(key, value);
	},
	removeItem(key) {
		if (support) window.localStorage.removeItem(key);
	},
	clear() {
		if (support) window.localStorage.clear();
	},
};

export default localStrorageFix;
