const allure = require('allure-commandline');
const video = require('wdio-video-reporter');

exports.config = {
  runner: 'local',
  specs: ['./src/test/**/*.js'],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      acceptInsecureCerts: true,
    },
  ],
  logLevel: 'error',
  bail: 0,
  baseUrl: 'about:blank',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  mochaOpts: {
    require: ['@babel/register'],
    ui: 'bdd',
    timeout: 60000,
  },
  reporters: [
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
  ],
  // =====
  // Hooks
  // =====
  afterTest(test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      browser.takeScreenshot();
    }
  },
  onComplete(exitCode, config, capabilities, results) {
    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', 'allure-results', '--clean']);
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);
      generation.on('exit', function (exitCode) {
        clearTimeout(generationTimeout);
        if (exitCode !== 0) {
          return reject(reportError);
        }
        console.log('Allure report successfully generated');
        resolve();
      });
    });
  },
};
