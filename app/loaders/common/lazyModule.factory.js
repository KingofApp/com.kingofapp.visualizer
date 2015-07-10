'use strict';

angular
  .module('king.loaders.common')
  .factory("lazyModule", lazyModuleFn);

function lazyModuleFn( $rootScope, $templateCache, $location, $q, structureService ) {

  return loadModule;

  function loadModule( successCallback, errorCallback ) {

    var deferred = $q.defer();
    var promise  = deferred.promise;
    console.log("Dentro de Lazy module");

    structureService.getCurrent($location, loadFiles);

    return promise;

    function loadFiles(moduleInfo){

      var files = [
        "components/requirejs/text!"+moduleInfo.view,
        moduleInfo.ctrl
      ];
      require( files, onRequireSuccess, onRequireError );
    };

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
        console.log("!!!!!Module Not Loaded!!!!!", error);
        deferred.reject( error );
      }
    }

  }
}
