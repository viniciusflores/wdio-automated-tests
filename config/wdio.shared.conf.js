require('dotenv').config();
const allure = require('allure-commandline');
const video = require('wdio-video-reporter');

exports.config = {
  runner: 'local',
  specs: ['./src/test/**/*.js'],
  exclude: [],
  screenshotPath: './errorShots/',
  logLevel: 'error',
  coloredLogs: true,
  bail: 0,
  baseUrl: 'about:blank',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    require: ['@babel/register'],
    ui: 'bdd',
    timeout: 60000,
  },

  reporters: [
    'dot',
    [
      'spec',
      {
        symbols: {
          passed: '[PASS]',
          failed: '[FAIL]',
        },
      },
    ],
    [
      video,
      {
        saveAllVideos: true,
        videoSlowdownMultiplier: 3,
        outputDir: 'video-result',
      },
    ],
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
    [
      'junit',
      {
        outputDir: 'junit-report',
        outputFileFormat(options) {
          return `results.xml`;
        },
      },
    ],
  ],

  // =====
  // Hooks
  // =====
  afterTest(test, context, { error, result, duration, passed, retries }) {
    if (error) {
      browser.takeScreenshot();
    }
  },
  onComplete(exitCode, config, capabilities, results) {
    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', 'allure-results', '--clean']);
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 10000);
      // eslint-disable-next-line
      generation.on('exit', (exitCode) => {
        clearTimeout(generationTimeout);
        if (exitCode !== 0) {
          return reject(reportError);
        }
        resolve();
      });
    });
  },
};
