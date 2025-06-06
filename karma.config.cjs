'use strict';

var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');

function createCustomLauncher(browser, version, platform) {
  return {
    base: 'SauceLabs',
    browserName: browser,
    version,
    platform,
  };
}

module.exports = function (config) {
  var customLaunchers = {};
  var browsers = process.env.Browsers && process.env.Browsers.split(',');
  var sauceLabs;

  if (process.env.SAUCE_USERNAME || process.env.SAUCE_ACCESS_KEY) {
    customLaunchers = {};

    var runAll = true;
    var options = [
      'SAUCE_CHROME',
      'SAUCE_FIREFOX',
      'SAUCE_SAFARI',
      'SAUCE_OPERA',
      'SAUCE_IE',
      'SAUCE_EDGE',
      'SAUCE_IOS',
      'SAUCE_ANDROID',
    ];

    options.forEach(function (opt) {
      if (process.env[opt]) {
        runAll = false;
      }
    });

    // Chrome
    if (runAll || process.env.SAUCE_CHROME) {
      customLaunchers.SL_Chrome = createCustomLauncher('chrome');
      // customLaunchers.SL_ChromeDev = createCustomLauncher('chrome', 'dev');
      // customLaunchers.SL_ChromeBeta = createCustomLauncher('chrome', 'beta');
    }

    // Firefox
    if (runAll || process.env.SAUCE_FIREFOX) {
      //customLaunchers.SL_Firefox = createCustomLauncher('firefox');
      // customLaunchers.SL_FirefoxDev = createCustomLauncher('firefox', 'dev');
      // customLaunchers.SL_FirefoxBeta = createCustomLauncher('firefox', 'beta');
    }

    // Safari
    if (runAll || process.env.SAUCE_SAFARI) {
      // customLaunchers.SL_Safari7 = createCustomLauncher('safari', 7);
      // customLaunchers.SL_Safari8 = createCustomLauncher('safari', 8);
      customLaunchers.SL_Safari9 = createCustomLauncher(
        'safari',
        9.0,
        'OS X 10.11',
      );
      customLaunchers.SL_Safari10 = createCustomLauncher(
        'safari',
        '10.1',
        'macOS 10.12',
      );
      customLaunchers.SL_Safari11 = createCustomLauncher(
        'safari',
        '11.1',
        'macOS 10.13',
      );
    }

    // Opera
    if (runAll || process.env.SAUCE_OPERA) {
      // TODO The available versions of Opera are too old and lack basic APIs
      // customLaunchers.SL_Opera11 = createCustomLauncher('opera', 11, 'Windows XP');
      // customLaunchers.SL_Opera12 = createCustomLauncher('opera', 12, 'Windows 7');
    }

    // IE
    if (runAll || process.env.SAUCE_IE) {
      customLaunchers.SL_IE11 = createCustomLauncher(
        'internet explorer',
        11,
        'Windows 8.1',
      );
    }

    // Edge
    if (runAll || process.env.SAUCE_EDGE) {
      customLaunchers.SL_Edge = createCustomLauncher(
        'microsoftedge',
        null,
        'Windows 10',
      );
    }

    // IOS
    if (runAll || process.env.SAUCE_IOS) {
      // TODO IOS7 capture always timesout
      // customLaunchers.SL_IOS7 = createCustomLauncher('iphone', '7.1', 'OS X 10.10');
      // TODO Mobile browsers are causing failures, possibly from too many concurrent VMs
      // customLaunchers.SL_IOS8 = createCustomLauncher('iphone', '8.4', 'OS X 10.10');
      // customLaunchers.SL_IOS9 = createCustomLauncher('iphone', '9.2', 'OS X 10.10');
    }

    // Android
    if (runAll || process.env.SAUCE_ANDROID) {
      // TODO Mobile browsers are causing failures, possibly from too many concurrent VMs
      // customLaunchers.SL_Android4 = createCustomLauncher('android', '4.4', 'Linux');
      // customLaunchers.SL_Android5 = createCustomLauncher('android', '5.1', 'Linux');
    }

    browsers = Object.keys(customLaunchers);

    sauceLabs = {
      recordScreenshots: false,
      connectOptions: {
        // port: 5757,
        logfile: 'sauce_connect.log',
      },
      public: 'public',
    };
  } else if (
    process.env.TRAVIS_PULL_REQUEST &&
    process.env.TRAVIS_PULL_REQUEST !== 'false'
  ) {
    console.log(
      'Cannot run on Sauce Labs as encrypted environment variables are not available to PRs. ' +
        'Running on Travis.',
    );
    browsers = ['Firefox'];
  } else if (process.env.GITHUB_ACTIONS === 'true') {
    console.log('Running ci on GitHub Actions.');
    browsers = ['FirefoxHeadless', 'ChromeHeadless'];
  } else {
    browsers = browsers || ['Chrome'];
    console.log(
      `Running ${browsers} locally since SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are not set.`,
    );
  }

  config.set({
    basePath: '',
    frameworks: ['jasmine-ajax', 'jasmine', 'sinon'],
    exclude: [],
    rollupPreprocessor: {
      plugins: [resolve({ browser: true }), commonjs()],
      output: {
        format: 'iife',
        name: '_app',
        sourcemap: 'inline',
      },
    },
    reporters: ['progress'],
    port: 9876,
    captureTimeout: 4 * 60 * 1000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 4 * 60 * 1000,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: browsers,
    // Coverage reporting
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: '.',
    },

    sauceLabs: sauceLabs,
    customLaunchers: customLaunchers,
  });
};
