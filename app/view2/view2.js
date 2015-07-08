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

  [
    {name: 'controller', provider: $controllerProvider, method: 'register'},
    {name: 'service',    provider: $provide,            method: 'service'},
    {name: 'factory',    provider: $provide,            method: 'factory'},
    {name: 'value',      provider: $provide,            method: 'value'},
    {name: 'directive',  provider: $compileProvider,    method: 'directive '}
  ].forEach(function(row){
    // Let's keep the older references.
    angular['_'+row.name] = angular[row.name];
    // Provider-based controller,service,factory,value,directive, ?filter
    angular[row.name] = function(name, constructor){
      row.provider[row.method](name, constructor);
      return(this);
    }
  });
}])
.service('LocationServices', function($location){
  this.getControllerName = function(){
    var path = $location.$$path.toString().split(/[\/ -]/);
    var mname = '';

    for(var key in path){
      mname += path[key].charAt(0).toUpperCase() + path[key].substr(1).toLowerCase();
    }

    return mname;
  }

})
.controller('View2Ctrl', ['$scope','$route','$location','withLazyModule','LocationServices', function($scope,$route, $location,withLazyModule,LocationServices) {
  console.log("View2Ctrol");

  function setRoute(template){
    $route.when(
        $location.$$path,
        {
            template: template,
            controller: LocationServices.getControllerName()+'Ctrl'
        }
    ).reload();
  }

  withLazyModule().then(
    function(data) {
      console.log( "Lazy module loaded.",data);
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
    function( $rootScope, $templateCache, $q, LocationServices ) {
        var deferred = $q.defer();
        var promise = null;
        console.log("Dentro de Lazy module");
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
            // ----------- NOTE ------------
            // Hacer dinamico
            // Que ocurre cuando cargas 2 controladores con el mismo nombre
            // Pruebas con muchos modulos angular
            // Organizar un poco el codigo y separar en archivos
            // -----------------------------

            require(
                [
                    "components/requirejs/text!modules/"+LocationServices.getControllerName().toLowerCase()+"/index.html",
                    "modules/"+LocationServices.getControllerName().toLowerCase()+"/controller.js"
                ],
                function requireSuccess( templatesHtml ) {
                    // is expected to be a list of top level
                    // Script tags.
                    console.log("requireSuccess");

                    // Module loaded, resolve deferred.
                    $rootScope.$apply(
                        function() {
                            console.log("Module Loaded");
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
