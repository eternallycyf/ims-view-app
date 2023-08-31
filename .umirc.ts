import { defineConfig } from 'umi';
import extraPostCSSPlugins from './config/extraPostCSSPlugins';
const routerConfig = require('./src/routes');
const proxyConfig = require('./src/config/proxyConfig');

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  base: process.env.APP_ENV === 'development' ? '/' : '/ims-app/',
  publicPath: process.env.APP_ENV === 'development' ? '/' : '/ims-app/',
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routerConfig,
  proxy: proxyConfig,
  antd: { mobile: false },
  cssLoader: {
    localsConvention: 'camelCase',
    url: true,
  },
  extraPostCSSPlugins, // px转换为vw
});
