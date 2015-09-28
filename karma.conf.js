module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      {pattern: 'app/bower_components/angular/angular.js', included: true},
      {pattern: 'app/bower_components/angular-loader/angular-loader.js', included: true},
      {pattern: 'app/bower_components/angular-scenario/angular-scenario.js', included: false},
      {pattern: 'app/bower_components/angular-mocks/angular-mocks.js', included: true},
      {pattern: 'app/bower_components/angular-resource/angular-resource.js', included: true},
      {pattern: 'app/bower_components/angular-route/angular-route.js', included: true},
      {pattern: 'app/bower_components/jquery/dist/jquery.js', included: true},
      //{pattern: 'app/bower_components/protractor/lib/runner.js', included: false},
      'app/core/structure.service.js',
      'app/**/*.unit.test.js'
    ],


    autoWatch : true,

    proxies: {
      '/static/': 'http://localhost:9001/app/'
    },

    frameworks: [
              //'protactor',
              //'ng-scenario',
              //'mocha'
              'jasmine'
              ],

    browsers : [//'PhantomJS'
               'Chrome'
              //, 'Firefox'
              ],
    customLaunchers: {
      'PhantomJS_custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },


    plugins : [
            //'karma-ng-scenario',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            //'karma-mocha',
            'karma-phantomjs-launcher',
            'protractor',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    //exclude: ['app/bower_components/angular-mocks/ngAnimateMock.js']
  });
};
