/**
 * Created by liudonghui on 2018/4/15.
 */
const path = require('path');
const fs = require('fs');
const Events = require('../events');

const defaultOptions = {
  isDev: process.env.NODE_ENV !== 'production',
};

const koaRender = (app, options) => {
  if (app.context.render) return;

  options = { ...defaultOptions, ...options };
  const { isDev, basePath } = options;
  app.context.render = function (templateName, renderContent, initialState) {
    const ctx = this;
    const filePath = path.join(basePath, `${templateName}.html`);
    ctx.type = 'text/html';
    if (isDev) {
      return new Promise((resolve) => {
        process.send({
          action: Events.EVENT_FILE_READ,
          filename: filePath,
        });
        process.on(Events.EVENT_MSG, (data) => {
          if (data.action === Events.EVENT_FILE_READ_DONE) {
            const html = data.content.replace('<div id="root"></div>', `<div id="root">${renderContent}</div><script>window.INITIAL_STATE = ${JSON.stringify(initialState)}</script>`);
            ctx.body = html;
            resolve(html);
          }
        });
      });
    }
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          ctx.body = '500 Server Error';
          ctx.status = 500;
          ctx.logger.error('[render]', err.message || '500 Server Error');
          reject(err);
        } else {
          const html = data.replace('<div id="root"></div>', `<div id="root">${renderContent}</div><script>window.INITIAL_STATE = ${JSON.stringify(initialState)}</script>`);
          ctx.body = html;
          resolve(html);
        }
      });
    });
  };
};

module.exports = koaRender;
