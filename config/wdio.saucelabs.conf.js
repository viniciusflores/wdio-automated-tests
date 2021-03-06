const allureReporter = require('@wdio/allure-reporter').default;
const allure = require('allure-commandline');
const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,
  ...{
    user: process.env.SAUCELABS_USER,
    key: process.env.SAUCELABS_ACCESSKEY,
    region: 'us',
    maxInstances: 1,
    services: [
      [
        'sauce',
        {
          sauceConnect: true,
        },
      ],
    ],
    capabilities: [
      {
        'browserName': process.env.BROWSER ? process.env.BROWSER : 'Chrome',
        'browserVersion': process.env.BROWSER_VERSION
          ? process.env.BROWSER_VERSION
          : 'latest',
        'platformName': process.env.PLATFORM_NAME
          ? process.env.PLATFORM_NAME
          : 'Windows 10',
        'sauce:options': {
          screenResolution: process.env.RESOLUTION
            ? process.env.RESOLUTION
            : '1400x1050',
          build: process.env.BUILD_NAME
            ? process.env.BUILD_NAME
            : 'local-runner',
          recordVideo: true,
          recordScreenshots: true,
          extendedDebugging: true,
          capturePerformance: true,
        },
      },
    ],
    reporters: [
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
    afterTest(test, context, { error, result, duration, passed, retries }) {
      allureReporter.addDescription(
        `Saucelabs Session ID: ${browser.sessionId}`,
        'text',
      );
      browser.executeScript(`sauce:job-name=${test.title}`);
      if (passed) {
        browser.executeScript('sauce:job-result=passed');
      }
      if (error) {
        browser.executeScript('sauce:job-result=failed');
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
  },
};
