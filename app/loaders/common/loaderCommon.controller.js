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
console.log("MODULE", module);
      $scope.module = module || $scope.module;
      var split = $location.$$path.split("/");
      var moduleTemplate = split[split.length-1];
      // if(!split[split.length-1]){
      //   moduleTemplate = split[split.length-1];
      // }
      if(!module){
          //TODO: Display a 404 error or similar
      }
      else if( isAngularModule(module.type) ){
        lazyModule().then(function registerRoute(data) {
          console.log("LOADING",$location.$$path.split("/")[1]);
          $route.when($location.$$path, {
            // template   : data,
            templateUrl : 'modules/'+$location.$$path.split("/")[1]+'/index.html',
            // controller : module.controller.substring(0,1).toUpperCase()+module.controller.substring(1)+'Ctrl'
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
