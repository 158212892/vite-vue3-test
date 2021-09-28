// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    // to edit target browsers: use "browserslist" field in package.json
    // "autoprefixer": {},
    // 'postcss-import': {},
    // 'postcss-url': {},
    // 'postcss-write-svg': {
    //   utf8: false,
    // },
    // 官方说明文档 https://github.com/evrone/postcss-px-to-viewport/blob/HEAD/README_CN.md
    // 'postcss-px-to-viewport': {
    //   viewportWidth: 375, // (Number) UI设计图的宽度.
    //   viewportHeight: 605, // (Number)UI设计图的高度，一般可以不设置.
    //   unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
    //   viewportUnit: 'vw', // (String) Expected units. 指定转换的单位
    //   selectorBlackList: [], // (Array) The selectors to ignore and leave as px.
    //   minPixelValue: 1, // (Number) 设置要替换的最小像素值.
    //   mediaQuery: false, // (Boolean) 允许在媒体查询中转换px
    //   propList: ['*'], // 转化为vw的属性列表
    //   fontViewportUnit: 'vw', // 字体使用的单位
    //   selectorBlaskList: ['.ignore-'], // 指定不需要转换的类
    // },
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 2560,
      unitPrecision: 3,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['ignore-'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568,
    },
  },
};
