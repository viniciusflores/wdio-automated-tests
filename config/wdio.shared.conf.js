require('dotenv').config();

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

  // =====
  // Hooks
  // =====
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
};
