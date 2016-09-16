// var helper = require('./helper.js');

exports.config = {
  //directConnect: true,

  //seleniumAddress: 'http://localhost:4444/wd/hub',

  allScriptsTimeout: 30000,

  specs: [
    '../**/*.e2e.test.js'
    // '../**/TODOe2e.test.js'
  ],

  // getMultiCapabilities: helper.getFirefoxProfile,


  capabilities: {
    // 'browserName': 'phantomjs',
    browserName: 'chrome',
    chromeOptions: {
      mobileEmulation: {
        deviceMetrics: {'width': 414, 'height': 736, 'pixelRatio': 2}
      }
    }

    /*
     * Can be used to specify the phantomjs binary path.
     * This can generally be ommitted if you installed phantomjs globally.
     */
    //'phantomjs.binary.path': require('phantomjs').path,

    /*
     * Command line args to pass to ghostdriver, phantomjs's browser driver.
     * See https://github.com/detro/ghostdriver#faq
     */
    //'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  },
  baseUrl: 'http://localhost:9001/app/',


  // keepAlive: true,

  framework: 'jasmine2',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    showColors: false // Use colors in the command line report.
  }
};
