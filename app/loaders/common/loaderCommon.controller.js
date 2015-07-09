(function(){
  'use strict';

  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl)

  commonLoaderCtrl.$inject = ['$scope','$route','$location','lazyModule','currentLocationService', 'structureService'];

  function commonLoaderCtrl($scope, $route, $location, lazyModule, currentLocationService, structureService) {
    console.log("commonLoaderCtrl");

    $location.$$path = $location.$$path || '/';

    var structure = structureService.get();
    $scope.templates = { $:'loaders/jquery/loaderJquery.view.html',
                         A:'loaders/angular/loaderAngular.view.html' };
    //registrar ruta
    findRoute($location.$$path, structure, function(module){
      //When jQuery
      $scope.module = module || $scope.module;
      if(module){
        if(module.type=="A"){
          //When Angular
          lazyModule().then(
            function(data) {
              console.log( "Lazy module loaded.",data);
              var route = {
                template: data,
                controller : currentLocationService.getControllerName()+'Ctrl'
              }
              setRoute(route);
              //$scope.template = $scope.templates[module.type];
            }
          );
        }else{
          $scope.template = $scope.templates[module.type];
        }
      }


    });

    $scope.data = JSON.stringify(structure, null, "    ");
    //console.log($scope.data);


    function setRoute(route){
      $route.when($location.$$path, route).reload();

      // console.log({
      //   controller: currentLocationService.getControllerName()+'Ctrl'
      // });
    }

    function findRoute(path, structure, callback){
      for(var key in structure){
        // console.log(key, path, path.indexOf(key));
        if(path === key){
          callback(structure[path]);
        }
        else if(path.indexOf(key) === 0){
          findRoute(path, structure[key].children, callback);
        }
        else{
          // console.log("*null*");
          callback(null);
        }
      }
    }
    // I listen for the route change and store the current route action
    // so that we can see how the routes changes after user interaction.
    $scope.$on("$routeChangeSuccess", handleRouteChangeSuccessEvent);

    function handleRouteChangeSuccessEvent( next , current) {
      //console.log("Change Success");
      $scope.routeAction = ( $route.current.action || null );
    }

  }

}());
