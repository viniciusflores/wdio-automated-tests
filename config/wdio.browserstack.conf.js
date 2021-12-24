const allureReporter = require('@wdio/allure-reporter').default;

const { config } = require('./wdio.shared.conf');

const capabilities = {
  browserName: process.env.BROWSER ? process.env.BROWSER : 'CHROME',
  browserVersion: process.env.BROWSER_VERSION
    ? process.env.BROWSER_VERSION.toLocaleLowerCase()
    : 'latest',
  projectName: process.env.PROJECT_NAME
    ? process.env.PROJECT_NAME
    : 'WDIO_AUTOMATED_TESTS',
  buildName: process.env.BUILD_NAME ? process.env.BUILD_NAME : 'ENV-LOCAL',
  os: process.env.OPERATIONAL_SYSTEM
    ? process.env.OPERATIONAL_SYSTEM
    : 'WINDOWS',
  osVersion: process.env.OPERATING_SYSTEM_VERSION
    ? process.env.OPERATING_SYSTEM_VERSION
    : '10',
  resolution: process.env.RESOLUTION ? process.env.RESOLUTION : '1920x1080',
  runner: process.env.RUNNER ? process.env.RUNNER : 'ENV-LOCAL',
};

exports.config = {
  ...config,
  ...{
    host: process.env.BROWSERSTACK_HUB,
    user: process.env.BROWSERSTACK_USER,
    key: process.env.BROWSERSTACK_ACCESSKEY,
    maxInstances: process.env.BROWSERSTACK_PARALLEL_RUNS
      ? Number(process.env.BROWSERSTACK_PARALLEL_RUNS)
      : 1,
    services: [['browserstack']],
    capabilities: [
      {
        'browserName': capabilities.browserName,
        'browserVersion': capabilities.browserVersion,
        'bstack:options': {
          projectName: capabilities.projectName,
          buildName: capabilities.buildName,
          os: capabilities.os,
          osVersion: capabilities.osVersion,
          resolution: capabilities.resolution,
          local: false,
          debug: 'false',
          consoleLogs: 'errors',
          networkLogs: 'false',
          video: 'true',
          seleniumLogs: 'true',
          maskCommands: 'setValues',
          maskBasicAuth: 'true',
          timezone: 'America/Sao_Paulo',
          wsLocalSupport: true,
        },
        'goog:chromeOptions': {
          args: [
            'start-maximized',
            '--incognito',
            'disable-infobars',
            'disable-popup-blocking',
            'disable-notifications',
          ],
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
    afterTest(test, context, { error, result, duration, passed, retries }) {
      allureReporter.addDescription(
        `Browserstack ID: ${browser.sessionId}`,
        'text',
      );
      if (error) {
        browser.takeScreenshot();
      }
    },
  },
};
