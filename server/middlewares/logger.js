/**
 * Created by liudonghui on 2018/4/19.
 */
const supportsColor = require('supports-color');

const logLevel = {
    'success': 0,
    'info': 1,
    'warn': 2,
    'error': 3
};

const defaultColors = {
    warn: "\u001b[1m\u001b[33m",
    error: "\u001b[1m\u001b[31m",
    success: "\u001b[1m\u001b[32m",
    info: "\u001b[1m\u001b[34m",
    reset: "\u001b[39m\u001b[22m"
};

function colorMsg(msg, level) {
    if (!supportsColor) {
        return msg
    }
    level = level || 'info';
    return `${defaultColors[level]}${msg}${defaultColors.reset}`;
}

function defaultFormatter(...args) {
    return JSON.stringify(args)
}

const getLogger = (options) => {
    options = Object.assign({ formatter: defaultFormatter }, options);
    const logger = {};
    Object.keys(logLevel).forEach(level => {
        const logMethod = logLevel[level] >= 3 ? 'error' : logLevel[level] >= 2 ? 'warn' : 'log';
        logger[level] = (...args) => {
            console[logMethod](`${colorMsg(options.formatter(level, ...args), level)}`);
        }
    });
    return logger;
};

module.exports = getLogger;