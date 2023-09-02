import { defineConfig } from '@umijs/max';
import extraPostCSSPlugins from './config/extraPostCSSPlugins';
import routerConfig from './src/routes';
const proxyConfig = require('./src/config/proxyConfig');
const path = require('path');

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  base: process.env.NODE_ENV === 'development' ? '/' : '/ims-app/',
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/ims-app/',
  layout: false,
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  fastRefresh: true,
  clickToComponent: {},
  devtool: process.env.NODE_ENV === 'production' ? 'eval' : 'source-map',
  hash: true,
  mfsu: true,
  routes: routerConfig,
  proxy: proxyConfig,
  extraPostCSSPlugins, // px转换为vw
  dva: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  lessLoader: {
    modifyVars: {
      hack: `true; @import "${path.resolve(
        'src/assets/styles/variable.less',
      )}";`,
    },
    javascriptEnabled: true,
  },
  cssLoader: {
    url: true,
  },
  npmClient: 'yarn',
});
