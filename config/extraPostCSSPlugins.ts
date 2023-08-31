import px2vw from 'postcss-px-to-viewport-8-plugin';

export default [
  px2vw({
    unitToConvert: 'px', // 要转化的单位
    viewportWidth: 375, // 视窗宽度
    viewportHeight: 1200, // 视窗高度
    unitPrecision: 4, // 转换后的精度，即小数点位数
    propList: ['*'], // 指定转换的css属性的单位，＊代表所有
    viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认为vw
    fontViewportUnit: 'vw', // 字体转换后的视窗单位
    selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名
    minPixelValue: 1, // 小于或者等于1px不进行转换
    // mediaQuery: false, // 媒体查询中的css是否需要转换，默认为false
    replace: true, // 是否转换后直接更换属性值
    // exclude: ［／node＿modules／］，／/忽略文件
    landscape: false, // 是否处理横屏情况
  }),
];
