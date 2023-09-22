require('dotenv-flow').config({
  default_node_env: 'test',
  silent: true,
});

exports.config = {
  specs: ['./src/tests/web/**/*.js'],
  suites: {},
  exclude: [],
  logLevel: 'error',
  bail: 0,
  baseUrl: '',
  waitforTimeout: 90000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 600000,

    //
    // HOOKS
    //
    before() {
      // eslint-disable-next-line
      require('expect-webdriverio').setOptions({ wait: 60000 });
    },

    afterTest(test, context, { error, result, duration, passed, retries }) {
      if (error) {
        const filename = `ERR_${test.title}_${new Date()
          .toISOString()
          .slice(0, 10)}`;
        browser.saveScreenshot(`screenshots/${filename}.png`);
      }
    },
  },
};
