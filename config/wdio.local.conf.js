const video = require('wdio-video-reporter');
const allure = require('allure-commandline');
const { config } = require('./wdio.shared.conf.js');

exports.config = {
  ...config,
  ...{
    services: ['chromedriver'],
    maxInstances: 1,
    capabilities: [
      {
        'maxInstances': 1,
        'browserName': 'chrome',
        'acceptInsecureCerts': true,
        'goog:chromeOptions': {
          args: ['start-maximized', '--incognito'],
        },
      },
    ],
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
