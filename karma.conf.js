module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-loader/angular-loader.js',
      'app/bower_components/jquery/dist/jquery.js',
      'app/components/**/*.js',
      'app/view*/**/*.js',
      'app/modules/**/*.test.js'
    ],

    autoWatch : true,

    proxies: {
      '/static/': 'http://localhost:8000/app/'
    },

    frameworks: [
              //'ng-scenario',
              'jasmine'
              ],

    browsers : ['Chrome'],

    plugins : [
            //'karma-ng-scenario',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};