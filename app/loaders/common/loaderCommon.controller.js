(function(){
  'use strict';
  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl)

  commonLoaderCtrl.$inject = ['$scope','$route','$location','lazyModule', 'structureService'];

  function commonLoaderCtrl($scope, $route, $location, lazyModule, structureService) {
    console.log("commonLoaderCtrl");

    $location.$$path = $location.$$path || '/';

    $scope.templates = { $:'loaders/jquery/loaderJquery.view.html',
                         A:'loaders/angular/loaderAngular.view.html' };
    //Register Route
    structureService.getCurrent($location, function(module){

      $scope.module = module || $scope.module;

      if(!module){
          //TODO: Display a 404 error or similar
      }
      else if( isAngularModule(module.type) ){

        lazyModule().then(registerRoute);
        function registerRoute(data) {
          $route.when($location.$$path, {
            template   : data,
            controller : module.controller.substring(0,1).toUpperCase()+module.controller.substring(1)+'Ctrl'
          }).reload();
        }

      }
      else if( isJqueryModule(module.type) ){
        $scope.template = $scope.templates[module.type];
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
