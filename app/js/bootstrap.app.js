angular.element(document).ready(function () {
    $.get('core/structure.json', function (data) {
        angular
          .module('myApp').run( function run($rootScope) {
              $rootScope.appJsonStructure = data;
          })
          .constant( 'redirectUrl', data.config.index );
        angular.bootstrap(document, ['myApp']);
        console.log("Bootstrapd  ng-app");
    }).fail(function() {
      console.log("Default loading from samplemodules");
      angular.module('myApp').constant( 'redirectUrl', '' );
      angular.bootstrap(document, ['myApp']);
      console.log("Bootstrapd  ng-app");
      window.parent.postMessage('bootstrapped-app','*');
    });
});
