/**
 * Created by liudonghui on 2018/4/15.
 */
const path = require('path');
const fs = require('fs');

const defaultOptions = {
    isDev: process.env.NODE_ENV !== 'production',
};

const koaRender = (app, options) => {
    if (app.context.render) return;

    options = Object.assign({}, defaultOptions, options);
    const { isDev, basePath, devMiddleWare } = options;
    app.context.render = function (templateName, renderContent, initialState) {
        const ctx = this;
        const filePath = path.join(basePath, `${templateName}.html`);
        ctx.type = 'text/html';
        if (isDev) {
            const mfs = devMiddleWare.fileSystem;
            return new Promise((resolve) => {
                devMiddleWare.waitUntilValid(function () {
                    const htmlStream = mfs.readFileSync(filePath);
                    let html = htmlStream.toString();
                    html = html.replace('<div id="root"></div>', `<div id="root">${renderContent}</div><script>window.INITIAL_STATE = ${JSON.stringify(initialState)}</script>`);
                    ctx.body = html;
                    resolve(html);
                });
            });
        }
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, htmlData) => {
                if (err) {
                    ctx.body = '500 Server Error';
                    ctx.status = 500;
                    ctx.logger.error('render', err.message || '500 Server Error');
                    reject(err);
                } else {
                    htmlData = htmlData.replace('<div id="root"></div>', `<div id="root">${renderContent}</div><script>window.INITIAL_STATE = ${JSON.stringify(initialState)}</script>`);
                    ctx.body = htmlData;
                    resolve(htmlData);
                }
            });
        });
    };
};

module.exports = koaRender;
