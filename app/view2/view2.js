'use strict';

angular
  .module('myApp.view2', ['ngRoute'])
  .config(addRouteDecorator)
  .config(setDefaultPaths)
  .service('LocationServices', locationServices)
  .controller('View2Ctrl', view2Ctrl)
  .factory("withLazyModule", withLazyModuleFn);

function addRouteDecorator( $provide, $routeProvider ) {

  // Wire up the $route decorator.
  $provide.decorator( "$route", routeDecorator );

  // I augment the $route service - the original delegate ($route) is
  // returned, but with additional methods.
  function routeDecorator( $delegate ) {

    var $route = $delegate;

    $route.remove        = remove;
    $route.removeCurrent = removeCurrent;
    $route.when          = when;
    $route.otherwise     = otherwise;

    return( $route );

    // I remove a defined route at the given path.
    function remove( path ) {

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
    function removeCurrent() {
      return( this.remove( this.current.originalPath ) );
    };

    // I allow routes to be defined after the application has been
    // bootstrapped. These go into a shared "routes" collection.
    function when( path, route ) {
      $routeProvider.when( path, route );
      return( this );
    };

    function otherwise( route ) {
      $routeProvider.otherwise( route );
      return( this );
    };
  }
}

setDefaultPaths.$inject = ['$routeProvider','$controllerProvider', '$provide', '$compileProvider'];

function setDefaultPaths($routeProvider, $controllerProvider, $provide, $compileProvider) {
  //Default Route
  $routeProvider
    .otherwise({
      templateUrl: 'view2/view2.html',
      controller : 'View2Ctrl',
      action     : "section-view2"
    });

  [
    {name: 'controller', provider: $controllerProvider, method: 'register'  },
    {name: 'service',    provider: $provide,            method: 'service'   },
    {name: 'factory',    provider: $provide,            method: 'factory'   },
    {name: 'value',      provider: $provide,            method: 'value'     },
    {name: 'directive',  provider: $compileProvider,    method: 'directive '}
  ].forEach(function(row){
    angular['_'+row.name] = angular[row.name];         // Let's keep the older references.
    angular[row.name] = function(name, constructor){   // Provider-based controller,service,factory,value,directive, ?filter
      row.provider[row.method](name, constructor);
      return(this);
    }
  });
}

function locationServices($location){

  this.getControllerName = function(){
    var path  = $location.$$path.toString().split(/[\/ -]/);
    var mname = '';

    for(var key in path){
      mname += path[key].charAt(0).toUpperCase() + path[key].substr(1).toLowerCase();
    }

    return mname;
  }
}

view2Ctrl.$inject = ['$scope','$route','$location','withLazyModule','LocationServices'];

function view2Ctrl($scope,$route, $location,withLazyModule,LocationServices) {
  console.log("view2Ctrol");

  withLazyModule().then(
    function(data) {
      console.log( "Lazy module loaded.",data);
      setRoute(data);
    }
  );

  function setRoute(template){
    $route.when(
        $location.$$path,
        {
            template: template,
            controller: LocationServices.getControllerName()+'Ctrl'
        }
    ).reload();
  }

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
}

function withLazyModuleFn( $rootScope, $templateCache, $q, LocationServices ) {
    var deferred = $q.defer();
    var promise = null;
    function loadModule( successCallback, errorCallback ) {

      console.log("Dentro de Lazy module");
        successCallback = ( successCallback || angular.noop );
        errorCallback = ( errorCallback || angular.noop );

        // If the module has already been loaded then
        // simply bind the handlers to the existing promise.
        // No need to try and load the files again.
        if ( promise ) {
          return( promise.then( successCallback, errorCallback ) );
        }

        promise = deferred.promise;

        // Wire the callbacks into the deferred outcome.
        promise.then( successCallback, errorCallback );

        return( promise );

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
        var files = [
          "components/requirejs/text!modules/"+LocationServices.getControllerName().toLowerCase()+"/index.html",
          "modules/"+LocationServices.getControllerName().toLowerCase()+"/controller.js"
        ];

        require( files, onRequireSuccess, onRequireError );

        function onRequireSuccess( templatesHtml ) { // Module loaded, resolve deferred.  
          $rootScope.$apply( success );
          function success() {
            console.log("Module Loaded");
            deferred.resolve(templatesHtml);
          };
        }
        
        function onRequireError( error ) { // Module load failed, reject deferred.
          $rootScope.$apply(reject);  
          function reject(){
            console.log("Module Not Loaded");
            deferred.reject( error );
          }
        }
    }

    return( loadModule );
}
