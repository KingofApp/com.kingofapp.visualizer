(function(){
  'use strict';

  angular
    .module('king.loaders.common', ['ngRoute'])
    .service('currentLocationService', currentLocationService)

  function currentLocationService($location){

    this.getControllerName = function(){
      var path  = $location.$$path.toString().split(/[\/ -]/);
      var moduleName = '';

      for(var key in path){
        moduleName += path[key].charAt(0).toUpperCase() + path[key].substr(1).toLowerCase();
      }

      return moduleName;
    }
  }

}());