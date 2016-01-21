angular.element(document).ready(function() {
  $.getJSON('core/structure.json', function(data) {
    angular
      .module('myApp').run(function run($rootScope) {
        $rootScope.appJsonStructure = data;
      })
      .config(['configServiceProvider', function(configServiceProvider) {
        configServiceProvider.config({
          services: data.services
        });
      }]);

    angular.bootstrap(document, ['myApp']);
    console.log('Bootstraped ng-app');
  }).fail(function() {
    console.log('Default loading from samplemodules');
    angular.module('myApp').constant('redirectUrl', '');
    angular.bootstrap(document, ['myApp']);
    console.log('Bootstraped ng-app');
    window.parent.postMessage('bootstrapped-app', '*');
  });
});
