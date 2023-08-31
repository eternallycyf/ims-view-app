import { defineConfig } from '@umijs/max';
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
  routes: routerConfig,
  proxy: proxyConfig,
  extraPostCSSPlugins, // px转换为vw
  access: {},
  model: {},
  initialState: {},
  request: {},
  npmClient: 'yarn',
});
