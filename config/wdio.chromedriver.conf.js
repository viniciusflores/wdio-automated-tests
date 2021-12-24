const video = require('wdio-video-reporter');

const { config } = require('./wdio.shared.conf');

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
        'pageLoadStrategy': 'normal',
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
          disableWebdriverScreenshotsReporting: true,
        },
      ],
    ],
  },
};
