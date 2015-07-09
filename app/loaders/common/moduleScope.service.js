(function(){
  'use strict';
  angular
    .module('king.loaders.common.scope', ['ngRoute'])
    .factory("moduleScopeService",function($rootScope){
      var data = {
              module: ''
          };

          return {
              getModule: function () {
                  return data.module;
              },
              setModule: function (module) {
                  data.module = module;
              }
          };
    });
}());
