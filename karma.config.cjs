'use strict';

var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');

module.exports = function (config) {
  var browsers = process.env.Browsers && process.env.Browsers.split(',');

  config.set({
    basePath: '', // 基础路径
    frameworks: ['jasmine'], // 测试框架
    files: ['test/**/*.spec.js'], // 需要加载到浏览器中的文件(测试文件、依赖库等)
    exclude: [], // 不需要加载的文件
    rollupPreprocessor: {
      plugins: [resolve({ browser: true }), commonjs()],
      output: {
        format: 'iife',
        name: '_app',
        sourcemap: 'inline',
      },
    },
    plugins: ['karma-jasmine', 'karma-chrome-launcher'],
    reporters: ['progress'], // 指定测试报告格式
    port: 9876, // karma服务器端口号
    captureTimeout: 4 * 60 * 1000, // 等待浏览器启动并连接到测试服务器的最大时间
    browserDisconnectTimeout: 10000, // 断开连接后等待连接的最大时间
    browserDisconnectTolerance: 1, // 允许浏览器​​断开重连的最大次数​​
    browserNoActivityTimeout: 4 * 60 * 1000, // 测试过程中无任何活动（如日志输出、测试进展）的​​最大等待时间​​
    colors: true, // 控制台输出启用​​彩色日志
    logLevel: config.LOG_INFO, // 日志级别
    autoWatch: false, // 文件监听模式
    browsers: browsers, // 使用的浏览器
    coverageReporter: {
      type: 'lcov', // 生成 LCOV 格式报告（兼容 Codecov、Coveralls）
      dir: 'coverage/', // 报告输出目录
      subdir: '.', // 子目录（设为 `.` 表示直接输出到 `dir` 根目录）
    },
  });
};
