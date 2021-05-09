const allureReporter = require('@wdio/allure-reporter').default;
const allure = require('allure-commandline');
const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,
  ...{
    user: process.env.LAMBDATEST_USER,
    key: process.env.LAMBDATEST_ACCESSKEY,
    hostname: process.env.LAMBDATEST_HOST,
    path: process.env.LAMBDATEST_PATH,
    port: Number(process.env.LAMBDATEST_PORT),
    services: ['lambdatest'],
    maxInstances: 1,
    capabilities: [
      {
        'browserName': process.env.BROWSER ? process.env.BROWSER : 'Chrome',
        'version': process.env.BROWSER_VERSION
          ? process.env.BROWSER_VERSION
          : 'latest',
        'platformName': process.env.PLATFORM_NAME
          ? process.env.PLATFORM_NAME
          : 'Windows 10',
        'buildName': process.env.BUILD_NAME
          ? process.env.BUILD_NAME
          : 'local-runner',
        'os': process.env.OPERATIONAL_SYSTEM
          ? process.env.OPERATIONAL_SYSTEM
          : 'Windows',
        'osVersion': process.env.OPERATING_SYSTEM_VERSION
          ? process.env.OPERATING_SYSTEM_VERSION
          : '10',
        'resolution': process.env.RESOLUTION
          ? process.env.RESOLUTION
          : '1366x768',
        'network': true,
        'visual': true,
        'console': true,
        'video': true,
        'selenium_version': '3.9.0',
        'timezone': 'UTC-04:00',
        'geoLocation': 'US',
        'chrome.driver': '88.0',
        'headless': false,
        'performance': true,
        'networkThrottling': 'Regular 4G',
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
        `Lambdatest Session ID: ${browser.sessionId}`,
        'text',
      );
      browser.executeScript(`lambda-name=${test.title}`);
      if (passed) {
        browser.executeScript('lambda-status=passed');
      }
      if (error) {
        browser.executeScript('lambda-status=failed');
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
