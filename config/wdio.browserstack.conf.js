const allureReporter = require('@wdio/allure-reporter').default;
const { config } = require('./wdio.shared.conf.js');

exports.config = {
  ...config,
  ...{
    host: process.env.BROWSERSTACK_HUB,
    user: process.env.BROWSERSTACK_USER,
    key: process.env.BROWSERSTACK_ACCESSKEY,
    maxInstances: 1,
    updateJob: false,
    capabilities: [
      {
        'browserName': process.env.BROWSER ? process.env.BROWSER : 'Chrome',
        'browserVersion': process.env.BROWSER_VERSION
          ? process.env.BROWSER_VERSION
          : 'latest',
        'bstack:options': {
          projectName: process.env.PROJECT_NAME
            ? process.env.PROJECT_NAME
            : 'wdio-automated-tests',
          buildName: process.env.BUILD_NAME
            ? process.env.BUILD_NAME
            : 'local-runner',
          os: process.env.OPERATIONAL_SYSTEM
            ? process.env.OPERATIONAL_SYSTEM
            : 'Windows',
          osVersion: process.env.OPERATING_SYSTEM_VERSION
            ? process.env.OPERATING_SYSTEM_VERSION
            : '10',
          resolution: process.env.RESOLUTION
            ? process.env.RESOLUTION
            : '1366x768',
          local: 'false',
          debug: 'false',
          consoleLogs: 'errors',
          networkLogs: 'false',
          video: 'true',
          seleniumLogs: 'true',
          seleniumVersion: '3.14.0',
        },
        'chrome:browserOptions': {
          args: ['--disable-notifications'],
        },
      },
    ],

    //
    // HOOKS
    //
    afterTest(test, context, { error, result, duration, passed, retries }) {
      allureReporter.addDescription(
        `Browserstack ID: ${browser.sessionId}`,
        'text',
      );
      browser.executeScript(
        `browserstack_executor: {"action": "setSessionName", "arguments": {"name": "${test.title}"}}`,
      );
      if (passed) {
        browser.executeScript(
          'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Test successfully"}}',
        );
      }
      if (error) {
        browser.executeScript(
          `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${String(
            error,
          )}"}}`,
        );
        browser.takeScreenshot();
      }
    },
  },
};
