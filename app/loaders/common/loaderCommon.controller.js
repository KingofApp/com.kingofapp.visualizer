(function(){
  'use strict';
  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl)
    .directive("polyScripts", function() {
        var updateScripts = function (element) {
            return function (scripts) {
                element.empty();
                angular.forEach(scripts, function (source, key) {
                    var scriptTag = angular.element(
                        document.createElement("script"));
                    source = "//@ sourceURL=" + key + "\n" + source;
                    scriptTag.text(source)
                    element.append(scriptTag);
                });
            };
        }; 
        return {
            restrict: "EA",
            scope: {
              scripts: "=" 
            },
            link: function(scope,element) {
                scope.$watch("scripts", updateScripts(element));
            }
        };
    });

  commonLoaderCtrl.$inject = ['$scope', '$rootScope','$location', '$ocLazyLoad', 'structureService','angularLoader'];

  function commonLoaderCtrl($scope, $rootScope, $location, $ocLazyLoad, structureService, angularLoader) {
    console.log("pasa por el commonLoaderCtrl");
    $location.$$path = $location.$$path || '/';
    $rootScope.$watch('menu', function (newValue, oldValue) {
      if(structureService.getMenu() != newValue){
        structureService.setMenu(newValue);
        console.log("Seteo y cambio a /menu", newValue);
        window.location = "#/menu";
        // $location.path("menu");
      }
    });

    //Load config
    structureService.loadconfig($rootScope);
    //Register Route
    structureService.getModule($location.$$path).then(function(module){
      console.log("Module",module);
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
