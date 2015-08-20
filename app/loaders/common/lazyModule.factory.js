'use strict';

angular
  .module('king.loaders.common')
  .factory("lazyModule", lazyModuleFn);

function lazyModuleFn( $rootScope, $templateCache, $location, $q, structureService ) {

  return loadModule;

  function loadModule( successCallback, errorCallback ) {

    var deferred = $q.defer();
    var promise  = deferred.promise;

    structureService.getCurrentModules($location, loadFiles);

    return promise;

    function loadFiles(modules){
      var files = [];
      angular.forEach(modules, function(value, key) {
        if(value.dependencies){
          for(var i=0; i<value.dependencies.length; ++i) {
            this.push(value.dependencies[i].src);
          }
        }
        for(var i=0; i<value.files.length; ++i) {
          this.push(value.files[i]);
        }

      }, files);
      require( files, onRequireSuccess, onRequireError );
      

      // require ngDefine and all angular modules your app requires
      // require([ 'https://cdn.firebase.com/js/client/2.2.4/firebase.js' ], function(ngDefine, angular) {

        // require the application
        // require(['https://cdn.firebase.com/js/client/2.2.4/firebase.js'], function() {
        //
        //   // bootstrap the application
        //   angular.bootstrap(document.body, ['firebase']);
        // });
      // });
      //Registrar modulo
      // define (['firebase']);
      // angular.module('myApp').requires.push('firebase');
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
