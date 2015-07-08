(function(){
  'use strict';

  angular
    .module('king.loaders.common')
    .controller('commonLoaderCtrl', commonLoaderCtrl)

  commonLoaderCtrl.$inject = ['$scope','$route','$location','lazyModule','currentLocationService'];

  function commonLoaderCtrl($scope, $route, $location, lazyModule, currentLocationService) {
    console.log("commonLoaderCtrl");
    console.log("lazyModule", lazyModule);

    lazyModule().then(
      function(data) {
        console.log( "Lazy module loaded.",data);
        setRoute(data);
      }
    );

    function setRoute(template){
      $route.when( $location.$$path, {
        template: template,
        controller: currentLocationService.getControllerName()+'Ctrl'
      }).reload();

      console.log({
        template: template,
        controller: currentLocationService.getControllerName()+'Ctrl'
      });
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