'use strict';

angular.module('myApp.view2', ['ngRoute'])
// Decorate the $route service to allow us to alter routes after bootstrap.
.config(
  function( $provide, $routeProvider ) {

      // Wire up the $route decorator.
      $provide.decorator( "$route", routeDecorator );


      // I augment the $route service - the original delegate ($route) is
      // returned, but with additional methods.
      function routeDecorator( $delegate ) {

          // Create a familiar short-hand for the delegate.
          var $route = $delegate;


          // I remove a defined route at the given path.
          $route.remove = function( path ) {

              // Normalize the path by removing any trailing slash - when
              // AngularJS sets up a route, it creates an auto-redirect from
              // your route to the other version (with or without a slash,
              // depending on what you defined); we need to delete your path
              // and the auto-redirect path.
              path = path.replace( /\/$/i, "" );

              // Delete your path and the auto-redirect version.
              delete( this.routes[ path ] );
              delete( this.routes[ path + "/" ] );

              return( this );

          };


          // This provides a short-hand to removing the current route without
          // having to access the current route in the calling context.
          $route.removeCurrent = function() {
            console.log(this);
              return( this.remove( this.current.originalPath ) );
          };


          // I allow routes to be defined after the application has been
          // bootstrapped. These go into a shared "routes" collection.
          $route.when = function( path, route ) {
              $routeProvider.when( path, route );
              return( this );
          };

          $route.otherwise = function( route ) {
              $routeProvider.otherwise( route );
              return( this );
          };


          // Return the decorated service.
          return( $route );

      }
  })
.config(['$routeProvider', function($routeProvider) {
  //Default Route
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    action: "section-view2"
  })
  //Dynamic Routes
  // .when("/c/:catchAll*", {
  //       resolve: {
  //           catchAll: "cResolver"
  //       }
  //   })
  .otherwise({
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    action: "section-view2"
  });
}])
.controller('KingModuleCtrl', ['$scope','$route','$location', function($scope,$route, $location) {
  $scope.routeAction = "URL "+$location.$$path.toString();
}])
.controller('View2Ctrl', ['$scope','$route','$location', function($scope,$route, $location) {
  console.log("View2Ctrol");
  // I show the action associated with the current route.
  console.log($location.$$path.toString().replace('/c/',""));
// ang-module + Ctrl
  $route.when(
      $location.$$path,
      {
          templateUrl: 'view2/view2.html',
          action: "section-c-"+$location.$$path.toString().replace('/c/',""),
          controller: 'KingModuleCtrl'
      }
  ).reload();

  // I listen for the route change and store the current route action
  // so that we can see how the routes changes after user interaction.
  $scope.$on(
      "$routeChangeSuccess",
      function handleRouteChangeSuccessEvent( next , current) {
          //console.log("Change Success");
          $scope.routeAction = ( $route.current.action || null );
        //console.log(current);
      //console.log('next', next);
      }
  );
}]);
