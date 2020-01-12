/* eslint-disable import/no-mutable-exports */
let minirefresh = {
    default: {},
};

if (process.env.REACT_ENV === 'client') {
    minirefresh = require('minirefresh');
}

export default minirefresh;
