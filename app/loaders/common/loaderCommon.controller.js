(function(){
  'use strict';
  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl)
  commonLoaderCtrl.$inject = ['$scope', '$rootScope','$route','$location','lazyModule', 'structureService'];

  function commonLoaderCtrl($scope, $rootScope, $route, $location, lazyModule, structureService) {
    $location.$$path = $location.$$path || '/';

    var templates = { $:'loaders/jquery/loaderJquery.view.html',
                         A:'loaders/angular/loaderAngular.view.html' };
    //Register Route
    structureService.getCurrent($location, function(module){

      $scope.module = module || $scope.module;
      var split = $location.$$path.split("/");
      var moduleTemplate = split[split.length-2];
      if(!split[split.length-2]){
        moduleTemplate = split[split.length-1];
      }
      //console.log("Split",);
      if(!module){
          //TODO: Display a 404 error or similar
      }
      else if( isAngularModule(module.type) ){
        lazyModule().then(function registerRoute(data) {
          $route.when($location.$$path, {
            // template   : data,
            templateUrl : 'modules/menu1/index.html',
            controller : module.controller.substring(0,1).toUpperCase()+module.controller.substring(1)+'Ctrl'
          }).reload();
        });
      }
      else if( isJqueryModule(module.type) ){
        lazyModule().then(function registerRoute(data) {
          $scope.template = templates[module.type];
        });

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
