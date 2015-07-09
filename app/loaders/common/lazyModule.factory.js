'use strict';

angular
  .module('king.loaders.common')
  .factory("lazyModule", lazyModuleFn);

function lazyModuleFn( $rootScope, $templateCache, $q, currentLocationService ) {

  return loadModule;

  function loadModule( successCallback, errorCallback ) {

    console.log("Dentro de Lazy module");

    var deferred = $q.defer();
    var promise  = deferred.promise;
    var files    = [
      "components/requirejs/text!modules/"+currentLocationService.getControllerName().toLowerCase()+"/index.html",
      "modules/"+currentLocationService.getControllerName().toLowerCase()+"/controller.js"
    ];

    require( files, onRequireSuccess, onRequireError );

    return promise;

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
        console.log("!!!!!Module Not Loaded!!!!!");
        deferred.reject( error );
      }
    }
  }
}
