## start
```js
使用了vm布局 正常写px就行 脚手架会自动转vw
```

## install
- yarn
```js
"dependencies": {
   "antd-mobile": "^5.0.0-rc.12",
   "antd-mobile-icons": "^0.2.2",
   "axios": "^0.24.0",
   "classnames": "^2.3.1",
   "echarts": "^5.2.2",
   "echarts-for-react": "^3.0.2",
   "lodash": "^4.17.21",
   "moment": "^2.29.1",
   "react-activation": "^0.9.7",
   "vconsole": "^3.11.1"
},
"devDependencies":{
   "@types/lodash": "^4.14.177",
   "cross-env": "^7.0.3",
   "ejs": "^3.1.6",
   "postcss-px-to-viewport": "^1.1.1", "ts-node": "^10.4.0",
}
```

## .config/extraPostCSSPlugins.ts
- postcss-px-to-viewport
```js
import px2vw from 'postcss-px-to-viewport';

export default [
  px2vw({
    unitToConvert: 'px',         // 要转化的单位
    viewportwidth: 375,          // 视窗宽度
    viewportHeight: 1200,        // 视窗高度
    unitPrecision: 4,            // 转换后的精度，即小数点位数
    propList: ['*'],             // 指定转换的css属性的单位，＊代表所有
    viewportUnit: 'vw',          // 指定需要转换成的视窗单位，默认为vw
    fontViewportUnit: 'vw',      // 字体转换后的视窗单位
    selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名
    minPixelValue: 1,            // 小于或者等于1px不进行转换
    // mediaQuery: false, // 媒体查询中的css是否需要转换，默认为false 
    replace: true, // 是否转换后直接更换属性值
    // exclude: ［／node＿modules／］，／/忽略文件
    landscape: false,// 是否处理横屏情况
  }),
];
```

## .umirc.ts
```js
import { defineConfig } from 'umi';
import extraPostCSSPlugins from './config/extraPostCSSPlugins';
const routerConfig = require('./src/routes');
const proxyConfig = require('./src/config/proxyConfig');

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  base: process.env.APP_ENV === 'development' ? '/' : '/ims-app/',
  publicPath: process.env.APP_ENV === 'development' ? '/' : '/ims-app/', hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routerConfig,
  proxy: proxyConfig,
  antd: { mobile: false },
  fastRefresh: {},
  cssLoader: {
    localsConvention: 'camelCase',
    url: true,
  },
  extraPostCSSPlugins // px转换为vw
});
```

## http://localhost:8000/my
