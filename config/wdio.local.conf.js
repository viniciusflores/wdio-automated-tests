const allure = require('allure-commandline');
const video = require('wdio-video-reporter');
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

    // =====
    // Hooks
    // =====
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
  },
};
