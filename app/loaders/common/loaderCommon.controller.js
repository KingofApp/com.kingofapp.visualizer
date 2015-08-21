(function(){
  'use strict';
  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl)
  commonLoaderCtrl.$inject = ['$scope', '$rootScope','$route','$location', 'structureService','$ocLazyLoad'];

  function commonLoaderCtrl($scope, $rootScope, $route, $location, structureService, $ocLazyLoad) {
    console.log("pasa por el commonLoaderCtrl");
    $location.$$path = $location.$$path || '/';

    //Load config
    structureService.loadconfig($rootScope);
    //Register Route
    structureService.getCurrent($location, function(module){
      $scope.module = module || $scope.module;
      if(!module){
          //TODO: Display a 404 error or similar
      }
      else if( isAngularModule(module.type) ){

        structureService.getCurrentModules($location, function loadmodules(modules) {
          var files = [];
          var dep = [];
          angular.forEach(modules, function(value, key) {
            if(value.dependencies){
              for(var i=0; i<value.dependencies.length; ++i) {
                dep.push(value.dependencies[i].src);
              }
            }
            for(var i=0; i<value.files.length; ++i) {
              this.push(value.files[i]);
            }

          }, files);
          structureService.getModulefromPath( "/"+$location.$$path.split("/")[1], function(moduleInfo){
            $ocLazyLoad.load(dep).then(function() {
              $scope.lazyLoadParams = [
                files
              ];
              $scope.template=moduleInfo.view;
            })

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
