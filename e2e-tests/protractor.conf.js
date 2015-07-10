exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '../**/*.e2e.test.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/app/',

  keepAlive: true,

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
