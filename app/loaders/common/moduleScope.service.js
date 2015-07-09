(function(){
  'use strict';
  angular
    .module('king.loaders.common')
    .factory("moduleScopeService", moduleScopeService);

  function moduleScopeService($rootScope){
    var module;

    return {
      getModule: function() {
          return module;
      },
      setModule: function(localModule) {
          module = localModule;
      }
    };
  }

}());
