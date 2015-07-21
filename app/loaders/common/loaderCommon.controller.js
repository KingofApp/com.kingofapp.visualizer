(function(){
  'use strict';
  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl)
  commonLoaderCtrl.$inject = ['$scope', '$rootScope','$route','$location','lazyModule', 'structureService'];

  function commonLoaderCtrl($scope, $rootScope, $route, $location, lazyModule, structureService) {
    console.log("pasa por el commonLoaderCtrl");
    $location.$$path = $location.$$path || '/';

    var templates = { $:'loaders/jquery/loaderJquery.view.html',
                         A:'loaders/angular/loaderAngular.view.html' };
    //Register Route
    structureService.getCurrent($location, function(module){
      $scope.module = module || $scope.module;
      if(!module){
          //TODO: Display a 404 error or similar
      }
      else if( isAngularModule(module.type) ){
        lazyModule().then(function registerRoute(data) {
          structureService.getModulefromPath( "/"+$location.$$path.split("/")[1], function(moduleInfo){
            $route.when($location.$$path, {
              templateUrl : 'modules/'+moduleInfo.controller+'/index.html'
            }).reload();

          });
        });
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
