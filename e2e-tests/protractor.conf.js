var jasmineReporters = require('jasmine-reporters');

exports.config = {

  //directConnect: true,

  //seleniumAddress: 'http://localhost:4444/wd/hub',

  allScriptsTimeout: 30000,

  specs: [
    '../**/*.wp.test.js'
  ],

  capabilities: {
    // 'browserName': 'phantomjs',
    'browserName': 'chrome'
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

  baseUrl: 'http://localhost:9000/app/',

  //keepAlive: true,

  framework: 'jasmine2',

  onPrepare: function() {
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: 'testresults',
        filePrefix: 'xmloutput'

    }));
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    showColors: false, // Use colors in the command line report.
  }
};
