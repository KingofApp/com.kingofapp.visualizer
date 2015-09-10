(function(){
  'use strict';
  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl);

  commonLoaderCtrl.$inject = ['$scope', '$rootScope','$location', '$ocLazyLoad', 'structureService','angularLoader'];

  function commonLoaderCtrl($scope, $rootScope, $location, $ocLazyLoad, structureService, angularLoader) {
    console.log("pasa por el commonLoaderCtrl");
    $location.$$path = $location.$$path || '/';
$rootScope.test='Variable';
setTimeout(function() {
  $rootScope.test='Variableasdsdsa';
  console.log("Cambia");
},2000);
    //Load config
    structureService.loadconfig($rootScope);
    //Register Route
    structureService.getModule($location.$$path).then(function(module){
      $scope.module = module || $scope.module;
      if(!module){
          //TODO: Display a 404 error or similar
      }
      else if( isAngularModule(module.type) ){
        angularLoader.module($scope);
      }
      else if( isJqueryModule(module.type) ){
        //TODO: Load jquery module from angular

      }
      else{
        //TODO: Display error and blame developer
      }
    });

    $scope.data = JSON.stringify(structureService.get(), null, "    ");

    function isAngularModule(type){ return type == 'A'; }
    function isJqueryModule (type){ return type == '$'; }

  }

}());
