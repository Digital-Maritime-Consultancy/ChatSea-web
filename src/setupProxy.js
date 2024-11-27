//src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/arpapi',
    createProxyMiddleware({
      target: 'http://133.186.159.251:60000',
      changeOrigin: true,
    })
  );
};