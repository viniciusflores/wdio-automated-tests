import { config } from './wdio.shared.conf';

const path = require('path');
const video = require('wdio-video-reporter');
const allure = require('allure-commandline');

exports.config = {
  ...config,
  ...{
    specs: ['./src/test.visual/**/*.js'],
    exclude: [],
    maxInstances: 1,
    capabilities: [
      {
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
      },
    ],
    services: [
      [
        'image-comparison',
        {
          baselineFolder: path.join(process.cwd(), './screenshots/reference/'),
          formatImageName: '{tag}-{logName}-{width}x{height}',
          screenshotPath: path.join(process.cwd(), './screenshots/'),
          savePerInstance: true,
          autoSaveBaseline: true,
          blockOutStatusBar: true,
          blockOutToolBar: true,
        },
      ],
      'chromedriver',
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

    //
    // HOOKS
    //
    before(caps, specs, browser) {
      browser.setWindowSize(1366, 768);
    },
    afterHook(test, context, { error, result, duration, passed, retries }) {
      if (error) {
        browser.takeScreenshot();
      }
    },
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
