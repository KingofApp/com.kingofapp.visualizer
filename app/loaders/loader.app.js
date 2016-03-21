angular.element(document).ready(function() {

  if(location.search.indexOf('builder') !== -1){
    loadFromBuilder();
  }else{
    loadFromStructure();
  }

  function loadFromStructure() {
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
      console.log('[V] Bootstraped ng-app');
    }).fail(function() {
      console.log("Error Reading structure.json");
    });
  }

  function loadFromBuilder() {
    console.log('[V] Default loading from samplemodules');
    angular.module('myApp').constant('redirectUrl', '');
    angular.bootstrap(document, ['myApp']);

    console.log('[V] Bootstraped ng-app');
    window.parent.postMessage('bootstrapped-app', '*');
  }

});
