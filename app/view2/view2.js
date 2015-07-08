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
.config(['$routeProvider','$controllerProvider', '$provide', '$compileProvider', function($routeProvider,$controllerProvider, $provide, $compileProvider) {
  //Default Route
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    action: "section-view2"
  })
  .otherwise({
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    action: "section-view2"
  });
  // Let's keep the older references.
  // angular._controller = angular.controller;
  // angular._service = angular.service;
  // angular._factory = angular.factory;
  // angular._value = angular.value;
  // angular._directive = angular.directive;

  [
    {name: 'controller', provider: $controllerProvider, method: 'register'},
    {name: 'service',    provider: $provide,            method: 'service'},
    {name: 'factory',    provider: $provide,            method: 'factory'},
    {name: 'value',      provider: $provide,            method: 'value'},
    {name: 'directive',  provider: $compileProvider,    method: 'directive '}
  ].forEach(function(row){
    angular['_'+row.name] = angular[row.name];
    angular[row.name] = function(name, constructor){
      row.provider[row.method](name, constructor);
      return(this);
    }
  });

  // Provider-based controller.
  // angular.controller = function( name, constructor ) {
  //
  //     $controllerProvider.register( name, constructor );
  //     return( this );
  //
  // };
  //
  // // Provider-based service.
  // angular.service = function( name, constructor ) {
  //
  //     $provide.service( name, constructor );
  //     return( this );
  //
  // };
  //
  // // Provider-based factory.
  // angular.factory = function( name, factory ) {
  //
  //     $provide.factory( name, factory );
  //     return( this );
  //
  // };
  //
  // // Provider-based value.
  // angular.value = function( name, value ) {
  //
  //     $provide.value( name, value );
  //     return( this );
  //
  // };
  //
  // // Provider-based directive.
  // angular.directive = function( name, factory ) {
  //
  //     $compileProvider.directive( name, factory );
  //     return( this );
  //
  // };

  // NOTE: You can do the same thing with the "filter"
  // and the "$filterProvider"; but, I don't really use
  // custom filters.
}])
.controller('KingModuleCtrl', ['$scope','$route','$location', function($scope,$route, $location) {
  $scope.testotro = "URL "+$location.$$path.toString();
}])
/*.controller('AngModuleCtrl', ['$scope', function($scope) {
  $scope.test = "URLqwdqw";
}])*/
.controller('View2Ctrl', ['$scope','$route','$location','withLazyModule', function($scope,$route, $location,withLazyModule) {
  console.log("View2Ctrol");
  // I show the action associated with the current route.
  var path = $location.$$path.toString().split(/[\/ -]/);
  var name = '';

  for(var key in path){
    name += path[key].charAt(0).toUpperCase() + path[key].substr(1).toLowerCase();
  }

  function setRoute(template){
    console.log(template);
    $route.when(
        $location.$$path,
        {
            template: template,
            action: "section-c-"+$location.$$path.toString().replace('/c/',""),
            controller: name+'Ctrl'
        }
    ).reload();
  }

  withLazyModule().then(
    function(data) {
      console.log( "Lazy module loaded.", data, arguments );
      setRoute(data);
    }
  );

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
}])
.factory(
    "withLazyModule",
    function( $rootScope, $templateCache, $q ) {

        var deferred = $q.defer();
        var promise = null;

        function loadModule( successCallback, errorCallback ) {

            successCallback = ( successCallback || angular.noop );
            errorCallback = ( errorCallback || angular.noop );

            // If the module has already been loaded then
            // simply bind the handlers to the existing promise.
            // No need to try and load the files again.
            if ( promise ) {

                return(
                    promise.then( successCallback, errorCallback )
                );

            }

            promise = deferred.promise;

            // Wire the callbacks into the deferred outcome.
            promise.then( successCallback, errorCallback );

            // Load the module templates and components.
            // --
            // The first dependency here is an HTML file which
            // is loaded using the text! plugin. This will pass
            // the value through as an HTML string.
            require(
                [
                    "components/requirejs/text!modules/angmodule/index.html",
                    "modules/angmodule/controller.js"
                ],
                function requrieSuccess( templatesHtml ) {
                  console.log('templatesHtml',templatesHtml);
                  console.log('arguments',arguments);
                    // is expected to be a list of top level
                    // Script tags.
                    console.log("requireSuccess");
                    /*$( templatesHtml ).each(
                        function() {
                          //debugger;

                            var template = $( this );
                            var id = template.attr( "id" );
                            var content = template.html();
                            //$templateCache.put( id, content );

                        }
                    );*/

                    // Module loaded, resolve deferred.
                    $rootScope.$apply(
                        function() {
                            console.log("Module Loaded");
                            console.log(templatesHtml);
                            deferred.resolve(templatesHtml);

                        }
                    );

                },
                function requireError( error ) {

                    // Module load failed, reject deferred.
                    $rootScope.$apply(
                        function() {

                            deferred.reject( error );

                        }
                    );

                }
            );

            return( promise );

        }

        return( loadModule );

    }
);
