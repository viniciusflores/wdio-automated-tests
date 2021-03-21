import { config } from './wdio.shared.conf';

const path = require('path');

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

    //
    // HOOKS
    //
    before(caps, specs, browser) {
      browser.setWindowSize(1366, 768);
    },
  },
};
