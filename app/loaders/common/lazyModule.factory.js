'use strict';

angular
  .module('king.loaders.common')
  .factory("lazyModule", lazyModuleFn);

function lazyModuleFn( $rootScope, $templateCache, $q, moduleScopeService ) {

  return loadModule;

  function loadModule( successCallback, errorCallback ) {

    console.log("Dentro de Lazy module");
    var moduleInfo = moduleScopeService.getModule();
    var deferred = $q.defer();
    var promise  = deferred.promise;
    var files    = [
      "components/requirejs/text!modules/"+moduleInfo.folder+"/index.html",
      "modules/"+moduleInfo.folder+"/controller.js"
    ];
  //   require.config({
  //   paths: {
  //     "some": "some/v1.0"
  //   },
  //   waitSeconds: 0
  // });

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
        console.log("!!!!!Module Not Loaded!!!!!", error);
        deferred.reject( error );
      }
    }
  }
}
