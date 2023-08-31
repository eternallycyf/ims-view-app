module.exports = {
  '/api': {
    target: 'http://172.253.60.195/',
    changeOrigin: true,
    pathRewrite: {
      '^/api/': '',
    },
  },
  '/mobile/api': {
    target: 'http://172.253.60.195/',
    changeOrigin: true,
    pathRewrite: {
      // '^/mobile/api/': '',
    },
  },
};
