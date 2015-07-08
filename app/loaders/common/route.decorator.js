(function(){
  'use strict';

  angular
    .module('king.loaders.common')
    .config(addRouteDecorator)
    
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

}());