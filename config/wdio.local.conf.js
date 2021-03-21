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
  },
};
